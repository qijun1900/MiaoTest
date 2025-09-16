var express = require('express');
const UserController = require('../../controllers/user/UserController');
const JWT = require('../../MiddleWares/jwt');// ����JWT�м����������֤token
var UserRouter = express.Router();

UserRouter.post("/uniappAPI/User/Userlogin", UserController.Userlogin)//��¼�ӿ�
UserRouter.post("/uniappAPI/User/updateUserInfo", JWT.verifyTokenMiddleware(), UserController.updateUserInfo)//�û�������Ϣ�ӿ�(��)

module.exports = UserRouter;
