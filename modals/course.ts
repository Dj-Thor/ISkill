const mongoose = require("mongoose");
const { Schema } = mongoose;


const DefaultComments = [
  "This JavaScript course is fantastic! The explanations are clear, and the hands-on exercises really help solidify the concepts.",
  "I appreciate how the JavaScript course covers both the basics and more advanced topics, making it suitable for beginners and those with some programming experience.",
  "The instructor's enthusiasm for JavaScript is contagious, making the learning experience enjoyable and engaging.",
  "The course provides real-world examples, making it easier to see how JavaScript is applied in practical situations.",
  "I love that the JavaScript course includes a mix of video lectures, coding challenges, and quizzes – it keeps things interesting and interactive.",
  "As someone new to coding, this JavaScript course breaks down complex ideas into manageable chunks, making the learning curve less intimidating.",
  "The discussion forums associated with the course are helpful for getting additional clarification and connecting with other learners.",
  "The course doesn't just focus on syntax; it also delves into best practices and common pitfalls, giving a well-rounded understanding of JavaScript development.",
  "I appreciate the frequent updates to the course content, ensuring that it stays relevant with the latest JavaScript features and industry standards.",
  "The practical projects at the end of each module are a great way to apply what you've learned, and they provide a sense of accomplishment as you see your skills improve."
]


const courseSchema = new Schema({
 name : {type: String, require:true, unique:true},
 courseId : {type: String, require: true, unique:true},
 price: {type: Number, require: true, default:0},
 description: {type: String, require: true},
 mentors: {type:[], require: true},
 playlistId:{type: String, require: true, unique:true},
 img: {type: String, require: true},
 rating: {type: Number, default:4},
 comments: {type: [], default:DefaultComments},
 enrolledCount: {type: Number, default:0},
 isVideo: {type:Boolean, default:false},
 likes: {type:Number, default: 0},
 category: {type:String, default: "na"},
}, {timeStamps:true});

mongoose.models= {};
export default mongoose.model("course", courseSchema);