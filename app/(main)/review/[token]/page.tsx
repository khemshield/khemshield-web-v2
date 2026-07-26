import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TickCircle, InfoCircle } from "iconsax-react";

import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import Wrapper from "@/app/components/Generics/Wrapper";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import connectDB from "@/app/lib/db/connect";
import { lookupInvite, type InviteState } from "@/app/lib/reviews/review.service";

import ReviewForm from "./ReviewForm";

export const metadata: Metadata = {
  title: "Leave a review | Khemshield",
  // Review links are private and single-use, they must never end up in search
  // results or be followed by a crawler.
  robots: { index: false, follow: false },
};

// Every visit resolves a one-time token against the database, so there is
// nothing here worth caching.
export const dynamic = "force-dynamic";

type Props = {
  params: { token: string };
  searchParams: { submitted?: string };
};

const PROBLEM_COPY: Record<
  Exclude<InviteState, "valid">,
  { title: string; body: string }
> = {
  not_found: {
    title: "We don't recognise this link",
    body: "Please double check the link you were sent, it may have been cut short when it was copied. If it still doesn't work, reply to the message you got it in and we'll send a new one.",
  },
  expired: {
    title: "This link has expired",
    body: "Review links stay active for a short window. Reply to the message you received it in and we'll send you a fresh one.",
  },
  revoked: {
    title: "This link is no longer active",
    body: "It looks like this review link was cancelled. Please get in touch if you'd still like to leave a review.",
  },
  submitted: {
    title: "This review has already been submitted",
    body: "Thank you, we've got it. Each link can only be used once, so there's nothing more to do here.",
  },
};

const Panel = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div
    className="m-auto max-w-[95%] px-8 py-16 shadow-khemshadow
    lg:max-w-[830px] lg:px-32"
  >
    {children}
  </div>
);

const ReviewPage = async ({ params, searchParams }: Props) => {
  let state: InviteState;
  let invite: Awaited<ReturnType<typeof lookupInvite>>["invite"];

  try {
    await connectDB();
    ({ state, invite } = await lookupInvite(params.token));
  } catch (err) {
    // A client holding a valid link must not be shown an opaque crash. Tell them
    // it is our problem and that their link still works.
    console.error("[reviews] could not resolve the invite:", err);
    return (
      <Wrapper>
        <Panel>
          <InfoCircle
            variant="Bold"
            size={48}
            className="text-secondary-normal"
          />
          <BaseSpacing />
          <Heading variant="h2">We cannot load this right now</Heading>
          <BaseSpacing />
          <Text>
            Something is wrong on our side, not with your link. Please try again
            in a few minutes, and it will still work.
          </Text>
        </Panel>
      </Wrapper>
    );
  }

  const justSubmitted = searchParams.submitted === "1";

  // The submit action redirects back here, by which point the invite is marked
  // submitted. Distinguish "you just finished" from "this link is spent".
  if (justSubmitted && state === "submitted") {
    return (
      <Wrapper>
        <Panel>
          <TickCircle variant="Bold" size={48} className="text-green-600" />
          <BaseSpacing />
          <Heading variant="h2">Thank you</Heading>
          <BaseSpacing />
          <Text>
            Your review is with us. We read every one before it goes on the site,
            so give us a day or two and keep an eye on the homepage.
          </Text>
        </Panel>
      </Wrapper>
    );
  }

  if (state !== "valid" || !invite) {
    const copy = PROBLEM_COPY[state as Exclude<InviteState, "valid">];

    return (
      <Wrapper>
        <Panel>
          <InfoCircle
            variant="Bold"
            size={48}
            className="text-secondary-normal"
          />
          <BaseSpacing />
          <Heading variant="h2">{copy.title}</Heading>
          <BaseSpacing />
          <Text>{copy.body}</Text>
        </Panel>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Panel>
        <Heading variant="h2">Share your experience</Heading>
        <BaseSpacing />
        <Text>
          Hello {invite.clientName}, thank you for taking a few minutes to review
          your work with Khemshield. Only the rating, your review, your name and
          your role are required, and you will see exactly how it appears on our
          site before you submit.
        </Text>
        <ContentSpacing />
        <ReviewForm token={params.token} clientName={invite.clientName} />
      </Panel>
    </Wrapper>
  );
};

export default ReviewPage;
