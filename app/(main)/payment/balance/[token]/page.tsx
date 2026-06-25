import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Wrapper from "@/app/components/Generics/Wrapper";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import Button from "@/app/components/Buttons/Button";
import { formatNumber } from "@/app/lib/formatNumber";
import PayBalanceButton from "./PayBalanceButton";

export const metadata: Metadata = {
  title: "Pay your balance",
  robots: { index: false },
};

interface Props {
  params: { token: string };
}

interface BalanceInfo {
  courseTitle: string;
  currency: string;
  amountPaid: number;
  balance: number;
  isFullyPaid: boolean;
}

const getBalance = async (token: string): Promise<BalanceInfo | null> => {
  const baseUrl = process.env.KHEMSHIELD_BASE_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${baseUrl}/api/v1/payments/balance/${token}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as BalanceInfo;
  } catch {
    return null;
  }
};

const BalancePage = async ({ params }: Props) => {
  const info = await getBalance(params.token);
  if (!info) notFound();

  const settled = info.isFullyPaid || info.balance <= 0;

  return (
    <section>
      <Wrapper>
        <ContentSpacing />
        <div className="mx-auto max-w-[520px] rounded-2xl border border-black/[0.08] bg-white p-8 shadow-khemshadow">
          {settled ? (
            <>
              <h1 className="font-display text-2xl font-extrabold text-secondary-normal">
                You&apos;re all paid up
              </h1>
              <p className="mt-3 text-secondary-normal/80">
                There&apos;s no outstanding balance on{" "}
                <strong>{info.courseTitle}</strong>. Thank you!
              </p>
              <div className="mt-6">
                <Button elementType="link" href="/training" variant="primary">
                  Browse courses
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl font-extrabold text-secondary-normal">
                Complete your payment
              </h1>
              <p className="mt-2 text-secondary-normal/80">
                Settle the remaining balance for{" "}
                <strong>{info.courseTitle}</strong>.
              </p>

              <dl className="mt-6 flex flex-col gap-2 rounded-xl bg-support p-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#8C94A3]">Already paid</dt>
                  <dd className="font-medium text-secondary-normal">
                    {formatNumber(info.amountPaid)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-black/[0.07] pt-2">
                  <dt className="text-[#8C94A3]">Balance due</dt>
                  <dd className="font-display text-lg font-extrabold text-secondary-normal">
                    {formatNumber(info.balance)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <PayBalanceButton token={params.token} />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#8C94A3]">
                Secure payment by card or bank transfer via Paystack.
              </p>
            </>
          )}
        </div>
        <ContentSpacing />
      </Wrapper>
    </section>
  );
};

export default BalancePage;
