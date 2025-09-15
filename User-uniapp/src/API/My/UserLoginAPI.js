import { http } from '../../util/http.js';

/**
 * �û���¼
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