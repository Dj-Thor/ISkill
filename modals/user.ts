const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  email : {type: String, require: true, unique: true},
  password : {type: String, require: true},
  name : {type: String},
  gender: {type: String},
  age: {type: Number},
  niche: {type: [], default:[]},
  enrolledCourses: {type: [], default: []},
  likedCourses: {type: [], default: []},
  wishlistCourses: {type: [], default: []},
}, {timeStamps:true});

mongoose.models= {};
export default mongoose.model("user", userSchema);