import { sendOtp } from "services/auth";

export const SendOtpForm = ({ setStep, phoneNumber, setPhoneNumber }) => {
  const submitSendOtpFormHandler = async (event) => {
    event.preventDefault();
    if (phoneNumber.length !== 11) return;
    const { response, error } = await sendOtp(phoneNumber);
    if (response) setStep(2);
    if (error) console.log(error.response.data.message);
  };
  return (
    <>
      <form onSubmit={submitSendOtpFormHandler} className={`form`}>
        <p className={`form-title`}>ورود به حساب کاربری</p>
        <span className={`form-text`}>
          برای استفاده از امکانات دیوار ، لطفا شماره موبایل خود را وارد کنید ،
          کد تایید به این شماره ارسال خواهد شد.
        </span>
        <label htmlFor="input" className={`form-label`}>
          شماره موبایل خود را وارد کنید
        </label>
        <input
          type="text"
          id={`input`}
          value={phoneNumber}
          placeholder={`شماره موبایل`}
          onChange={(event) => setPhoneNumber(event.target.value)}
          className={`form-input`}
        />
        <button type={"submit"} className={`form-button`}>
          ارسال کد تایید
        </button>
      </form>
    </>
  );
};
