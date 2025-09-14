const mongoose = require('mongoose')
//Admin USer
const ConsumerSchema = new mongoose.Schema({
    openid: {//�û�Ψһ��ʶ
        type: String,
        required: true,
        unique: true,
        index: true//����
    },
    session_key: {//�û��Ự��Կ
        type: String,
        required: true
    },
    nickname: { //�ǳ�
        type: String,
        default: ''
    },
    avatar: {   //ͷ��
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        default: 0 // 0:δ֪, 1:��, 2:Ů
    },
    createTime: {
        type: Date,
    }


})

const ConsumerModel = mongoose.model("consumer", ConsumerSchema)

module.exports = ConsumerModel