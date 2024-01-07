const mongoose = require("mongoose");
const { Schema } = mongoose;

const OTPSchema = new Schema({
 email: { type: String, require: true },
 OTPCode: { type: String, require: true },
 expireAt: { type: Date, expires: 240, default: Date.now },
 Verified: { type: Boolean, default: false }
}, { timeStamps: true });

mongoose.models = {};
export default mongoose.model("OTP", OTPSchema)