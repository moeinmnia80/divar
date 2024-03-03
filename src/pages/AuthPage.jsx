import { useState } from "react";
import { SendOtpForm } from "components/ui/SendOtpForm.jsx";
import { CheckOtpForm } from "components/ui/CheckOtpForm.jsx";

export const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  return (
    <>
      <section className={`form-container`}>
        {step === 1 && (
          <SendOtpForm
            setStep={setStep}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        )}
        {step === 2 && (
          <CheckOtpForm
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            phoneNumber={phoneNumber}
            setStep={setStep}
          />
        )}
      </section>
    </>
  );
};
