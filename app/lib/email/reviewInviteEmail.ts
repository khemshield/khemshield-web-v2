/**
 * Invite email sent when a review link is created with an address attached.
 *
 * Inlined styles and a table-free single-column layout, because that is what
 * survives Outlook and Gmail's stylesheet stripping. Plain text is not sent
 * separately, so the copy has to read sensibly even with styles discarded.
 */

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const reviewInviteSubject = "Would you share a short review?";

export const reviewInviteHtml = ({
  clientName,
  link,
  expiresAt,
}: {
  clientName: string;
  link: string;
  expiresAt: Date;
}): string => {
  const name = escapeHtml(clientName);
  const href = escapeHtml(link);
  const expiry = expiresAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `<div style="margin:0;padding:24px;background:#f6f6f6;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px;">

    <p style="margin:0 0 24px;font-size:18px;font-weight:600;color:#111111;">Khemshield</p>

    <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#333333;">Hello ${name},</p>

    <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#333333;">
      Thank you for working with us. If you have a few minutes, we would really
      appreciate a short review we can share on our website.
    </p>

    <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#333333;">
      It takes about two minutes. You will see exactly how your review looks
      before you submit it, and nothing is published until you give permission.
    </p>

    <p style="margin:0 0 24px;">
      <a href="${href}"
         style="display:inline-block;background:#F43334;color:#ffffff;
                text-decoration:none;font-size:16px;font-weight:600;
                padding:14px 28px;border-radius:8px;">Write your review</a>
    </p>

    <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#666666;">
      Or paste this link into your browser:
    </p>
    <p style="margin:0 0 24px;font-size:13px;line-height:20px;color:#666666;word-break:break-all;">
      ${href}
    </p>

    <p style="margin:0 0 24px;font-size:14px;line-height:20px;color:#666666;">
      This link is just for you and works once. It expires on ${expiry}.
    </p>

    <p style="margin:0;padding-top:24px;border-top:1px solid #eeeeee;
              font-size:13px;line-height:20px;color:#999999;">
      If you would rather not leave a review, you can ignore this email and we
      will not follow up.
    </p>

  </div>
</div>`;
};
