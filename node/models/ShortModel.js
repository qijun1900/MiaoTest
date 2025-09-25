// 填空题模型 route.query.questionType ==4
const mongoose = require('mongoose');
const ShortSchema  = new mongoose.Schema({
    examId:String,
    stem:String,
    content:String,//简答题答案
    isPublish:Number,
    analysis:String,// 新增字段，用于存储解析
    isAIanswer:Number,// 新增字段，用于存储是否AI回答 
    isAddUserList:Number,//0:不是，1：是
    Type:Number, // 题目类型
    createdTime:Date,
})
const ExamShortModel  = mongoose.model("short",ShortSchema)
module.exports = ExamShortModel