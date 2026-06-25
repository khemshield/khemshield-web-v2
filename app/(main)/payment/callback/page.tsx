import type { Metadata } from "next";
import Wrapper from "@/app/components/Generics/Wrapper";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import Button from "@/app/components/Buttons/Button";
import { formatNumber } from "@/app/lib/formatNumber";

export const metadata: Metadata = {
  title: "Payment status",
  robots: { index: false },
};

interface Props {
  searchParams: { reference?: string; trxref?: string };
}

interface VerifyResult {
  status: string;
  balanceLink?: string | null;
  balance?: number;
}

const verify = async (reference: string): Promise<VerifyResult> => {
  const baseUrl = process.env.KHEMSHIELD_BASE_URL || "http://localhost:5000";
  try {
    const res = await fetch(
      `${baseUrl}/api/v1/payments/paystack/verify/${reference}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { status: "error" };
    return await res.json();
  } catch {
    return { status: "error" };
  }
};

const WHATSAPP_NUMBER = "2348102618131";

const PaymentCallbackPage = async ({ searchParams }: Props) => {
  const reference = searchParams.reference || searchParams.trxref;
  const result = reference ? await verify(reference) : { status: "missing" };
  const success = result.status === "success";

  return (
    <section>
      <Wrapper>
        <ContentSpacing />
        <div className="mx-auto max-w-[560px] rounded-2xl border border-black/[0.08] bg-white p-8 text-center shadow-khemshadow">
          {success ? (
            <>
              <h1 className="font-display text-2xl font-extrabold text-secondary-normal">
                Payment confirmed
              </h1>
              <p className="mt-3 text-secondary-normal/80">
                You&apos;re enrolled. A confirmation email is on its way with
                your payment summary and next steps.
              </p>
              {reference && (
                <p className="mt-4 font-mono text-xs text-[#8C94A3]">
                  Reference: {reference}
                </p>
              )}

              {result.balanceLink && (
                <div className="mt-6 rounded-xl bg-support p-5 text-left">
                  <p className="text-sm font-semibold text-secondary-normal">
                    Balance remaining:{" "}
                    {formatNumber(result.balance ?? 0)}
                  </p>
                  <p className="mt-1 text-sm text-[#8C94A3]">
                    You paid a deposit. Clear the rest whenever you&apos;re
                    ready, we&apos;ve also emailed you this link.
                  </p>
                  <div className="mt-3">
                    <Button
                      elementType="link"
                      href={result.balanceLink}
                      variant="primary"
                    >
                      Pay balance now
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center gap-3">
                <Button elementType="link" href="/training" variant="border">
                  Browse more courses
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl font-extrabold text-secondary-normal">
                We couldn&apos;t confirm your payment
              </h1>
              <p className="mt-3 text-secondary-normal/80">
                If you were charged, don&apos;t worry, it may still be
                processing. Reach out with your reference and we&apos;ll sort it
                out right away.
              </p>
              {reference && (
                <p className="mt-4 font-mono text-xs text-[#8C94A3]">
                  Reference: {reference}
                </p>
              )}
              <div className="mt-6 flex flex-col justify-center gap-3 xs:flex-row">
                <Button
                  elementType="link"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi Khemshield, I need help with my payment. Reference: ${
                      reference ?? "(unknown)"
                    }.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  Contact us on WhatsApp
                </Button>
                <Button elementType="link" href="/training" variant="border">
                  Back to courses
                </Button>
              </div>
            </>
          )}
        </div>
        <ContentSpacing />
      </Wrapper>
    </section>
  );
};

export default PaymentCallbackPage;
