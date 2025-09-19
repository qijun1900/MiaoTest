import { http } from '../../util/http.js';

/**
 * ΢�� �û���¼ ע��
 * @param {string} message - ��¼��Ϣ
 * @param {string} code - ��¼ƾ֤
 * @returns {Promise} �����û���¼����
 * 
 */
export const Userlogin = async(message,code) => {
   try{
       return await http({
           url: '/uniappAPI/User/Userlogin',
           method: 'POST',
            data: {
               message,
               code,
            },
       });

   }catch(error){
       console.error("Userlogin ʧ��", error);
       throw error;
   }
}

/**
 * �û��˻�ע��(h5/wx)
 * @param  {string} account - �û��˺�
 * @param  {string} verifyCode - ��֤��
 * @param  {string} password - ����
 * @returns {Promise} ���ظ����û���Ϣ����Ӧ
 *
 */
export const UserRegister = async({account,verifyCode,password}) => {
   try{
       if (!account || !verifyCode || !password) {
           throw new Error("ȱ�ٱ�Ҫ����");
       }
       return await http({
           url: '/uniappAPI/User/UserRegister',
           method: 'POST',
            data: {
               account,
               verifyCode,
               password,
            }
       });
   }catch(error){
       console.error("UserRegister ʧ��", error);
       throw error;
   }
}