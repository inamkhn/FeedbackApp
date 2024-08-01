import { Resend } from "resend";
import EmailVerification from "../../Email/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    const data = await resend.emails.send({
      from: "inamkhn7786@gmail.com",
      to: email,
      subject: "Hello world",
      react: EmailVerification({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
};
