const digits = "23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateOTP(otp_length: number) {
  const OTP = [...Array(otp_length)].map(
    (_) => digits[Math.floor(Math.random() * digits.length)]
  );
  return OTP.join("");
}
