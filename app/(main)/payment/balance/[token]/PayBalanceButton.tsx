"use client";

import { useState } from "react";
import { toast } from "sonner";
import Button from "@/app/components/Buttons/Button";
import { startBalancePayment } from "@/app/actions/balance";

const WHATSAPP_NUMBER = "2348102618131";

const PayBalanceButton = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await startBalancePayment(token);

    if (res.message === "ok" && res.authorizationUrl) {
      window.location.assign(res.authorizationUrl);
      return; // leave loading true through the redirect
    }

    setLoading(false);
    toast.error(
      res.message === "ok"
        ? "Online payment isn't available right now. Please reach us on WhatsApp."
        : res.message,
      { position: "top-center" }
    );
  };

  return (
    <div className="flex flex-col gap-3 xs:flex-row">
      <Button variant="primary" onClick={handleClick} disabled={loading} full>
        {loading ? "Starting checkout…" : "Pay balance"}
      </Button>
      <Button
        elementType="link"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hi Khemshield, I'd like to pay the balance on my course enrollment."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        variant="border"
      >
        Pay via WhatsApp
      </Button>
    </div>
  );
};

export default PayBalanceButton;
