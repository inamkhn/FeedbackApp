import { connect } from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await connect();
    try {
      const { username, code } = await request.json();
  
      const decodedUsername = encodeURIComponent(username);
      const user = await UserModel.findOne({ username: decodedUsername });
      if (!user) {
        return Response.json(
          {
            success: false,
            message: "username is not exist",
          },
          { status: 400 }
        );
      }
      const isCodeVerified = user.verifyCode == code;
      const isCodeNotExpire = new Date(user.verifyCodeExpiry) > new Date();
      if (isCodeNotExpire && isCodeVerified) {
        user.isVerified = true;
        user.save();
        return Response.json(
          {
            success: true,
            message: "Account verified successfully",
          },
          { status: 200 }
        );
      } else if (!isCodeNotExpire) {
        return Response.json(
          {
            success: false,
            message:
              "Verification code has expired. Please sign up again to get a new code.",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return Response.json(
        {
          success: true,
          message: "error verifying code",
        },
        { status: 500 }
      );
    }
  }