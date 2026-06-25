"use server";

export type StartBalanceState = {
  message: string;
  authorizationUrl?: string | null;
};

export const startBalancePayment = async (
  token: string
): Promise<StartBalanceState> => {
  const baseUrl = process.env.KHEMSHIELD_BASE_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${baseUrl}/api/v1/payments/balance/${token}`, {
      method: "POST",
      cache: "no-store",
    });
    const json = await res.json();
    if (!res.ok) {
      return { message: json.message || "We couldn't start the payment." };
    }
    return { message: "ok", authorizationUrl: json.authorizationUrl };
  } catch (err) {
    console.error("[balance] request failed:", err);
    return {
      message:
        "We couldn't reach the server. Please make sure the API is running and try again.",
    };
  }
};
