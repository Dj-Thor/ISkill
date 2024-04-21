import dbConnect from "../../modals/db";
import NextCors from "nextjs-cors";
import SendMail from "../../myFunctions/sendOtp";
import type { NextApiRequest, NextApiResponse } from "next";
import user from "../../modals/user";
import VerifyOTP from "../../myFunctions/verifyOtp";
import CryptoJS from "crypto-js";

type response = {
  error?: string;
  msg?: string;
  success: boolean;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response>,
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method == "POST") {
    try {
      await dbConnect();
      const { OTP, newPassword, email } = req.body;
      if (!OTP || !newPassword) throw "Please OTP or Password";
      let OTPVerification = await VerifyOTP(email, OTP);
      if (!OTPVerification) throw "Invalid OTP";
      const mySecret = process.env["NEXTAUTH_SECRET"];
      if (!mySecret) throw "Internal Error";

      const encrypted = CryptoJS.AES.encrypt(newPassword, mySecret).toString();

      const updatedUser = await user.findOneAndUpdate(
        { email: email },
        { password: encrypted },
      );

      if (!updatedUser) throw "Some Error Occurred";

      return res
        .status(200)
        .json({ msg: "Password Updated Successfully", success: true });
    } catch (err) {
      res.status(400).json({ error: String(err), success: false });
    }
  } else {
    res.status(400).json({ error: "Invalid Request Method", success: false });
  }
}
