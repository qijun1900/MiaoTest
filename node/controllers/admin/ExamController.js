const ExamService = require("../../services/admin/ExamService");

const ExamController ={
    ExamAdd:async (req,res) => {
        const cover = req.file?`/examcoveruploads/${req.file.filename}`:""   
        const {name,category,code,year,isPublish,creator,day } = req.body
        const parsedCategory = JSON.parse(category).map(Number)
        console.log(name,parsedCategory,code,year,isPublish,cover,creator,day)
        await ExamService.ExamAdd({
            name,
            category:parsedCategory,
            code,
            year,
            isPublish:Number(isPublish),
            cover,
            creator,
            day,
            createdTime:new Date()
        })
        res.send({
            ActionType: "OK",
        }) 
    },
    getexamList:async (req,res)=>{
        const {page,size} = req.query
        const result = await ExamService.getexamList({
            page: Number(page),
            size: Number(size)
        })
        res.send({
            ActionType: "OK",
            data: result,
            code:200,
        })   
    },
    updateInfo:async(req,res)=>{
        const cover = req.file?`/examcoveruploads/${req.file.filename}`:""   
        const {name,code,category,year,isPublish,creator,day,_id} = req.body
        const parsedCategory = JSON.parse(category).map(Number)
        await ExamService.updateInfo({
            name,
            category:parsedCategory,
            code,
            year,
            isPublish:Number(isPublish),
            cover,
            creator,
            day,
            createdTime:new Date(),
            _id
        })
        res.send({
            ActionType: "OK",
            code:200,
        })
    },
    updateExamStatus:async(req,res)=>{
        const {_id,state} = req.body
        await ExamService.updateExamStatus({_id,state:Number(state)})
        res.send({
            ActionType: "OK",
            code:200,
        })
    },
    deleteOneExamInfo:async(req,res)=>{
        const {_id} = req.body
        await ExamService.deleteOneExamInfo({_id})
        res.send({
            ActionType: "OK",
            code:200,
        })
    },
    deleteManyExamInfo:async(req,res)=>{
        const {_ids} = req.body
        console.log(_ids)
        await ExamService.deleteManyExamInfo({_ids})
        res.send({
            ActionType: "OK",
            code:200,
        })
    },
    AddSelectQuestion:async(req,res)=>{
        const {examId,stem,options,isPublish,analysis,isAIanswer,isAddUserList,isMultiple,Type} = req.body
        await ExamService.AddSelectQuestion({
            examId,
            stem,
            options,
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            isAddUserList:Number(isAddUserList),
            Type:Number(Type),
            isMultiple:Number(isMultiple),
            createdTime:new Date()
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    AddBlankQuestion:async(req,res)=>{
        const {examId,stem,options,isPublish,analysis,isAIanswer,isAddUserList,Type} = req.body
        await ExamService.AddBlankQuestion({
            examId,
            stem,
            options,
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            isAddUserList:Number(isAddUserList),
            Type:Number(Type),
            createdTime:new Date()
        }) 
        res.send({
            code:200,
            ActionType:"OK", 
        })
    },
    AddJudgeQuestion:async(req,res)=>{
        const {examId,stem,answer,isPublish,analysis,isAIanswer,isAddUserList,Type} = req.body 
        await ExamService.AddJudgeQuestion({
            examId,
            stem,
            answer:Number(answer),
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            isAddUserList:Number(isAddUserList),
            Type:Number(Type),
            createdTime:new Date()
        })
        res.send({
            code:200,
            ActionType:"OK", 
        })
    },
    AddShortQuestionList:async(req,res)=>{
        const {examId,stem,content,isPublish,analysis,isAIanswer,isAddUserList,Type} = req.body
        await ExamService.AddShortQuestionList({
            examId,
            stem,
            content,  
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            isAddUserList:Number(isAddUserList),
            Type:Number(Type),
            createdTime:new Date()
        }) 
        res.send({
            code:200,
            ActionType:"OK", 
        })
    },
    getQuestionList:async(req,res)=>{
        const result = await ExamService.getQuestionList({
            examId:req.params.id,
            questionType:req.query.questionType,
            isPublish:req.query.isPublish,
            isAddUserList:req.query.isAddUserList
        })
        res.send({
            code:200,
            ActionType: "OK",
            data: result
        })
    },
    UpdateOneQuestion:async(req,res)=>{
        const {_id,isPublish} = req.body
        const questionType = req.query.questionType
        await ExamService.UpdateOneQuestion({
            _id,
            isPublish:Number(isPublish),
            questionType
        })
            
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    UpdateBatchQuestion:async(req,res)=>{
        const {ids,isPublish} = req.body
        const questionType = Number(req.query.questionType)
        await ExamService.UpdateBatchQuestion({
            ids,
            isPublish:Number(isPublish),
            questionType,
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    DeleteQuestion:async(req,res)=>{
        const questionType = Number(req.query.questionType)
        await ExamService.DeleteQuestion({
            _id: req.params.id,
            questionType
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    getQuestionInfo:async(req,res)=>{
        const questionType = Number(req.query.questionType)
        const result = await ExamService.getQuestionInfo({
            _id:req.params.id,
            questionType}) 
        res.send({
            code:200,
            ActionType:"OK",
            data:result, 
        })
    },
    UpdateSelectQuestion:async(req,res)=>{
        const _id = req.params.id
        const {stem,options,isPublish,analysis,isAIanswer} = req.body
        await ExamService.UpdateSelectQuestion({
            _id,
            stem,
            options,
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            createdTime:new Date(),
        }) 
        res.send({
            code:200,
            ActionType:"OK", 
        })
    },
    UpdateBlankQuestion:async(req,res)=>{
        const _id = req.params.id
        const {stem,options,isPublish,analysis,isAIanswer} = req.body
        await ExamService.UpdateBlankQuestion({
            _id,
            stem,
            options, 
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            createdTime:new Date(),
        })
        res.send({
            code:200,
            ActionType:"OK", 
        })
    },
    UpdateJudgeQuestion:async(req,res)=>{
        const _id = req.params.id
        const {stem,answer,isPublish,analysis,isAIanswer} = req.body
        await ExamService.UpdateJudgeQuestion({
            _id,
            stem,
            answer:Number(answer), 
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            createdTime:new Date(),  
        })
        res.send({
            code:200,
            ActionType:"OK", 
        })
    },
    UpdateShortQuestionList:async(req,res)=>{
        const _id = req.params.id
        const {stem,content,isPublish,analysis,isAIanswer} = req.body
        await ExamService.UpdateShortQuestionList({
            _id,
            stem,
            content,
            isPublish:Number(isPublish),
            analysis,
            isAIanswer:Number(isAIanswer),
            createdTime:new Date(),
        })
        res.send({
            code:200,
            ActionType:"OK", 
        })
    },
    UpdateExamStatus:async(req,res)=>{
        const {examId,isPublish} = req.body
        await ExamService.UpdateExamStatus({
            examId,
            isPublish:Number(isPublish),
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    AddUserExamInfo:async(req,res)=>{
        const {name,questionTitle,code,isPublish,category,examId,cover,year} = req.body
        await ExamService.AddUserExamInfo({
            name,
            questionTitle,
            code,
            isPublish:Number(isPublish),
            category,
            examId,
            cover,
            year,
            createdTime:new Date()
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    UpdateUserExamInfo:async(req,res)=>{
        const {name,questionTitle,code,isPublish,category,examId,cover,year} = req.body
        await ExamService.UpdateUserExamInfo({
            name,
            questionTitle,
            code,
            isPublish:Number(isPublish),
            category,
            examId,
            cover,
            year,
            createdTime:new Date()
        }) 
        res.send({
            code:302,
            ActionType:"OK", 
        })
    },
    getUserExamInfo:async(req,res)=>{
        const result = await ExamService.getUserExamInfo({examId:req.params.id})
        res.send({
            code:200,
            ActionType:"OK",
            data:result, 
        })
    },
    updateQuestionTitleStatus:async(req,res)=>{
        const {examId,titleId,isPublishType} = req.body 
        await ExamService.updateQuestionTitleStatus({
            examId,
            titleId,
            isPublishType
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    deleteQuestionTitle:async(req,res)=>{
        const {examId,titleId} = req.body
        await ExamService.deleteQuestionTitle({
            examId,
            titleId,
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    AddSingUserList:async(req,res)=>{
        const {examId,questionId,isAddUserList,Type,titleId,row} = req.body 
        const result = await ExamService.AddSingUserList({
            examId,
            questionId,
            isAddUserList ,
            Type:Number(Type),
            titleId,
            row,
        })
        res.send({
            code:200,
            ActionType:"OK", 
            data:result,
        })
    },
    RemoveSingUserList:async(req,res)=>{
        const {examId,questionId,isAddUserList,Type,titleId,row} = req.body 
         await ExamService.RemoveSingUserList({
            examId,
            questionId,
            isAddUserList ,
            Type:Number(Type),
            titleId,
            row,
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    batchPublishedUserQuestionsList:async(req,res)=>{
        const {examId,Type,titleId,questionId,questionIdS} = req.body
        await ExamService.batchPublishedUserQuestionsList({
            examId,
            Type,
            titleId,
            questionId,//用于题库的更新，二次匹配
            questionIdS,
        })
        res.send({
            code:200,
            ActionType:"OK",
        })
    },
    getUserQuestionsList:async(req,res)=>{
        const result = await ExamService.getUserQuestionsList(
            {
                examId: req.params.id,  // 从URL参数获取examId
                titleId: req.query.titleId,  // 从查询参数获取titleId
            }
        )
        res.send({
            code:200,
            ActionType:"OK",
            data:result,
        })
    },
    UserquestionlistDown:async(req,res)=>{
        const {questionType,isAddUserList} = req.body
        const result = await ExamService.UserquestionlistDown({
            examId:req.params.id,
            questionType,
            isAddUserList,
        })
        res.send({
            code:200,
            ActionType:"OK",
            data:result, 
        })

    }
}
module.exports = ExamController