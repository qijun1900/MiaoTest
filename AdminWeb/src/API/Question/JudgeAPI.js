import axios from "axios";
 export const judgeAPI = {
     //添加判断题
    postAddJudge: async (data) => {
        try{
            const res = await axios.post("/adminapi/exam/add/judgequestion", data)
            if(res.data.code === 200){
                return res.data
            }else{
                return null
            }
        }catch (error) {
            console.log(error)
        }
    },
    //更新判断题
    postUpdateJudge: async (data,_id) => {
        try{
            const res = await axios.post("/adminapi/exam/update/judgequestion", data,{params:{_id}})
            if(res.data.code === 200){
                return res.data
            }
        }catch (error) {
            console.log(error)
        }
    }
 }