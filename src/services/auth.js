import api from "configs/api";

const sendOtp = async (phoneNumber) => {
  try {
    const response = await api.post("auth/send-otp", { mobile: phoneNumber });
    return { response };
  } catch (error) {
    return { error };
  }
};

const checkOtp = async (optCode, phoneNumber) => {
  try {
    const response = await api.post("auth/check-otp", {
      mobile: phoneNumber,
      code: optCode,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};
export { sendOtp, checkOtp };
