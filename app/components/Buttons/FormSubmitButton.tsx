"use client";

import Button from "@/app/components/Buttons/Button";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const FormSubmitButton = ({ children }: Readonly<PropsWithChildren>) => {
  const { pending } = useFormStatus();
  return (
    <Button variant="primary" disabled={pending} full>
      {pending ? <span>Loading...</span> : <span>{children}</span>}
    </Button>
  );
};

export default FormSubmitButton;
