import axios from "axios";
import upload from "@/util/upload";

export async function postAddExam(data) {
    // 添加考试
    try {
        const response = await upload("/adminapi/exam/add", data);
        return response;
    } catch (error) {
        console.error("Error during add exam:", error);
    }
    try {
        const response = await upload("/adminapi/exam/add", data);
        return response;
    } catch (error) {
        console.error("Error during add exam:", error);
    }
}
export async function getExamList() {
    // 获取考试列表
    try {
        const response = await axios.get("/adminapi/exam/list");
        if (response.data.code === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Error during get exam list:", error);
    }
}

export async function postUpdateExam(data) {
    // 更新考试信息
    try {
        const response = await upload("/adminapi/exam/update", data);
        return response;
    } catch (error) {
        console.error("Error during update exam:", error);
    }
}

export async function updateExamStatus(_id, state) {
    // 更新考试状态
    try {
        const response = await axios.post("/adminapi/exam/updateExamStatus", { _id, state });
        if(response.data.code === 200) {
            return response.data;
        }

    }catch (error) {
        console.error("Error during update exam status:", error);
    }
    
}

export async function PostDeleteOneExam(_id) {
    // 删除单个考试信息
    try {
        const response = await axios.post("/adminapi/exam/deloneExam",{_id});
        if(response.data.code === 200) {
            return response.data;
        }  
    }catch (error) {
        console.error("Error during delete one exam:", error);
    }
    
}
export async function PostDeleteManyExam(_ids) {
    // 删除多个考试信息
    try {
        const response = await axios.post("/adminapi/exam/delmanyExam",{_ids});
        if(response.data.code === 200) {
            return response.data;
        }
    }catch (error) {
        console.error("Error during delete many exam:", error);
    }
    
}