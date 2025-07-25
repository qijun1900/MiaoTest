const LLMModel = require("../../models/LLMsModel");
const LLMService = {
    addmodel: async ({modelName,modelValue,isPublish,description,creator,createdTime}) => {
        return await LLMModel.create({
            modelName,
            modelValue,
            isPublish,
            description,
            creator,
            createdTime
        })
    },
    getmodel: async ({page,size}) => {
        // 分页查询
        const skip = (page - 1) * size
        const [data, total] = await Promise.all([
            LLMModel.find({})
                .skip(skip)
                .limit(size),
            LLMModel.countDocuments({})
        ])
        return { data, total };
    },
    updateModel: async ({_id, modelName, modelValue,description,creator,editTime}) => {
        return await LLMModel.updateOne({_id},{modelName,modelValue,description,creator,editTime})
    },
    deleteOnemodel: async ({modelName,modelValue,_id}) => {
        return await LLMModel.deleteOne({_id},{modelName,modelValue})
    },
    deleteManymodel: async ({_ids}) => {
        return await LLMModel.deleteMany({_id:{$in:_ids}})
    },
    changestatus: async ({_id,state}) => {
        return await LLMModel.updateOne({_id},{isPublish:state})
       
    }
    

}
module.exports = LLMService