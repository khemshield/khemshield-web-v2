import connectDB from "@/app/lib/db/connect";
import {
  ReviewInviteStatus,
  TestimonialStatus,
  countTestimonialsByStatus,
  listInvites,
  listTestimonialsByStatus,
} from "@/app/lib/reviews/review.service";

import ConfirmButton from "./ConfirmButton";
import InviteForm from "./InviteForm";
import ReviewCard from "./ReviewCard";
import { deleteInviteAction, revokeInviteAction } from "./actions";
import { studioLogoutAction } from "../login/actions";

// Moderation state must never be served stale.
export const dynamic = "force-dynamic";

const formatDate = (iso?: string): string =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
    <p className="text-2xl font-semibold text-secondary-normal">{value}</p>
    <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
  </div>
);

const EmptyNote = ({ children }: { children: string }) => (
  <p className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-8 text-center text-sm text-gray-500">
    {children}
  </p>
);

const inviteLabel = (invite: {
  status: ReviewInviteStatus;
  isExpired: boolean;
}): { text: string; className: string } => {
  if (invite.status === ReviewInviteStatus.Submitted) {
    return { text: "submitted", className: "bg-green-100 text-green-700" };
  }
  if (invite.status === ReviewInviteStatus.Revoked) {
    return { text: "revoked", className: "bg-gray-100 text-gray-600" };
  }
  if (invite.isExpired) {
    return { text: "expired", className: "bg-amber-100 text-amber-700" };
  }
  return { text: "waiting", className: "bg-blue-100 text-blue-700" };
};

/**
 * Shown instead of crashing when the database cannot be reached.
 *
 * A studio behind a passphrase is exactly where an operator needs to see *why*
 * something is broken, and in production an unhandled server-component throw is
 * an opaque "an error occurred" with the detail stripped out. The reason is kept
 * short and deliberately does not echo connection strings or secret values.
 */
/**
 * Strip credentials out of a driver error before it reaches the page. Mongo
 * errors sometimes embed the connection string, and this page is only passphrase
 * protected, not a place to render a database password.
 */
const redactCredentials = (message: string): string =>
  message.replace(/(mongodb(?:\+srv)?:\/\/)[^@\s]*@/gi, "$1<redacted>@");

const ConnectionProblem = ({ reason }: { reason: string }) => (
  <div className="rounded-xl border border-red-200 bg-red-50 p-6">
    <h1 className="text-lg font-semibold text-red-800">
      Cannot reach the database
    </h1>
    <p className="mt-2 text-sm text-red-700">{reason}</p>
    <p className="mt-4 text-sm text-red-700">Check, in this order:</p>
    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-red-700">
      <li>
        <code>MONGODB_URL</code> is set in this environment, and its database
        name is <code>khemshield_db</code> in production (not{" "}
        <code>khemshield_db_dev</code>).
      </li>
      <li>
        MongoDB Atlas Network Access allows this host. Serverless IPs are
        dynamic, so an allowlist limited to your own IP will block it.
      </li>
      <li>
        The database user in the connection string still has read and write
        access.
      </li>
    </ol>
  </div>
);

const StudioReviewsPage = async () => {
  let data;

  try {
    await connectDB();

    const [counts, pending, published, rejected, invites] = await Promise.all([
      countTestimonialsByStatus(),
      listTestimonialsByStatus(TestimonialStatus.Pending),
      listTestimonialsByStatus(TestimonialStatus.Published),
      listTestimonialsByStatus(TestimonialStatus.Rejected),
      listInvites(),
    ]);

    data = { counts, pending, published, rejected, invites };
  } catch (err) {
    // Logged in full for the platform logs, summarised for the page.
    console.error("[studio] could not load reviews:", err);
    return (
      <ConnectionProblem
        reason={
          err instanceof Error
            ? redactCredentials(err.message)
            : "Unknown error."
        }
      />
    );
  }

  const { counts, pending, published, rejected, invites } = data;

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-normal">
            Reviews
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Nothing reaches the site until you publish it.
          </p>
        </div>
        <form action={studioLogoutAction}>
          <button
            type="submit"
            className="h-9 rounded-lg border border-gray-300 px-4 text-sm text-gray-700"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Awaiting review" value={counts.pending} />
        <Stat label="Live on site" value={counts.published} />
        <Stat label="Rejected" value={counts.rejected} />
      </div>

      <InviteForm />

      <section>
        <h2 className="mb-4 font-semibold text-secondary-normal">
          Awaiting your review ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <EmptyNote>Nothing waiting. New submissions land here.</EmptyNote>
        ) : (
          <div className="space-y-4">
            {pending.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-secondary-normal">
          Live on the site ({published.length})
        </h2>
        {published.length === 0 ? (
          <EmptyNote>
            Nothing published yet, so the homepage section is hidden.
          </EmptyNote>
        ) : (
          <>
            {published.length > 1 && (
              <p className="mb-3 text-xs text-gray-500">
                Listed in the order visitors see them. Use the arrows to move the
                strongest reviews to the top.
              </p>
            )}
            <div className="space-y-4">
              {published.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  position={index}
                  total={published.length}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {rejected.length > 0 && (
        <section>
          <h2 className="mb-4 font-semibold text-secondary-normal">
            Rejected ({rejected.length})
          </h2>
          <div className="space-y-4">
            {rejected.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 font-semibold text-secondary-normal">
          Invite links ({invites.length})
        </h2>
        {invites.length === 0 ? (
          <EmptyNote>No links created yet.</EmptyNote>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Expires</th>
                  <th className="px-4 py-3">Note</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {invites.map((invite) => {
                  const label = inviteLabel(invite);

                  return (
                    <tr key={invite.id} className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <span className="font-medium text-secondary-normal">
                          {invite.clientName}
                        </span>
                        {invite.email && (
                          <span className="block text-xs text-gray-500">
                            {invite.email}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${label.className}`}
                        >
                          {label.text}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {formatDate(invite.expiresAt)}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {invite.note ?? ""}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {invite.status === ReviewInviteStatus.Pending &&
                          !invite.isExpired ? (
                            <ConfirmButton
                              action={revokeInviteAction}
                              fields={{ id: invite.id }}
                              label="Revoke"
                              tone="danger"
                              title="Revoke this invite link?"
                              confirmLabel="Yes, revoke"
                              pendingLabel="Revoking..."
                              description={
                                <>
                                  <p>
                                    The link sent to{" "}
                                    <strong className="font-semibold text-secondary-normal">
                                      {invite.clientName}
                                    </strong>{" "}
                                    stops working immediately. If they open it
                                    they will see a message saying it is no
                                    longer active.
                                  </p>
                                  <p>
                                    This cannot be undone. To let them review
                                    after all, create a new link and send that
                                    instead.
                                  </p>
                                </>
                              }
                            />
                          ) : null}

                          <ConfirmButton
                            action={deleteInviteAction}
                            fields={{ id: invite.id }}
                            label="Delete"
                            tone="danger"
                            title="Delete this invite link?"
                            confirmLabel="Delete permanently"
                            pendingLabel="Deleting..."
                            description={
                              <>
                                <p>
                                  Removes the record of the link sent to{" "}
                                  <strong className="font-semibold text-secondary-normal">
                                    {invite.clientName}
                                  </strong>{" "}
                                  from this list, and the link stops working.
                                </p>
                                {invite.status ===
                                  ReviewInviteStatus.Submitted && (
                                  <p>
                                    The review they already submitted is{" "}
                                    <strong className="font-semibold text-secondary-normal">
                                      not
                                    </strong>{" "}
                                    affected. To remove that too, delete it from
                                    the lists above.
                                  </p>
                                )}
                                <p className="font-semibold text-red-700">
                                  This cannot be undone.
                                </p>
                              </>
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudioReviewsPage;
