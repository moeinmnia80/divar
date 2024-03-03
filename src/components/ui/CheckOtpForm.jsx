import { checkOtp } from "services/auth";
import { setCookie } from "utils/cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user.js";
export const CheckOtpForm = ({ otpCode, setOtpCode, phoneNumber, setStep }) => {
  const navigate = useNavigate();
  const { refetch } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const submitCheckOtpFormHandler = async (event) => {
    event.preventDefault();
    // otp length condition
    if (otpCode.length !== 5) return;
    // get access token & refresh token
    const { response, error } = await checkOtp(otpCode, phoneNumber);
    if (response) {
      setCookie(response.data);
      // then authentication navigate to HomePage
      navigate("/");
      await refetch();
    }
    if (error) console.log(error.response.data.message);
    // console.log({ response, error });
  };
  return (
    <>
      <form onSubmit={submitCheckOtpFormHandler} className={`form`}>
        <p className={`form-title`}>تایید کد ارسال شده</p>
        <div className={`form-text`}>
          کد پیامک شده به شماره
          <span> «{phoneNumber}» </span>را وارد کنید.
        </div>
        <label htmlFor="input" className={`form-label`}>
          کد تایید را وارد کنید
        </label>
        <input
          type="text"
          id={`input`}
          placeholder={`کد تایید`}
          value={otpCode}
          onChange={(event) => setOtpCode(event.target.value)}
          className={`form-input`}
        />
        <button type={"submit"} className={`form-button`}>
          ورود
        </button>
        <button onClick={() => setStep(1)} className={`form-button mt-12`}>
          تغییر شماره موبایل
        </button>
      </form>
    </>
  );
};
