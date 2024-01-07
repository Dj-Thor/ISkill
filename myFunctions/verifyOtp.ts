import OTP from '../modals/otp';
const VerifyOTP = async (Email:string, Code:string) => {
  
  let Dta = await OTP.findOne({email:Email, OTPCode:Code});
  
 if (Dta == null) {
   return false;
 }
 else return true;
}

export default VerifyOTP;