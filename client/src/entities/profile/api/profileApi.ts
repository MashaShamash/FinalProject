import type { AxiosResponse } from 'axios';

import type { Profile, ProfileId, ProfileWhizautIdAndWhizautUserId, ProfileWhizautIdAndWhizautUserIdAndNameLastName } from '../types/profileTypes';
import axiosInstance from '../../../services/axiosInstance';



class ProfileApi {

  static getAllProfile = async (): Promise<Profile[]> => {
    try {
      const response: AxiosResponse<{ message: 'success'; profUsers: Profile[] }> =
        await axiosInstance.get('/profile', {
          headers: {
          "Content-Type": "multipart/form-data",
          }
       });
      return response.data.profUsers;
    } catch (error) {
      throw new Error('Ошибка на запросе');
    }
  };

  static getUpdateProfile = async (obj: {id:ProfileId, body: ProfileWhizautIdAndWhizautUserId}): Promise<Profile> => {
    try {
      console.log(2222222, obj.body, obj.body);
      
      const response: AxiosResponse<{ message: 'success'; profUser: Profile }> =
        await axiosInstance.put(`/profile/${obj.id}`, obj.body, {
          headers: {
          "Content-Type": "multipart/form-data",
          }
       });
       console.log(555555, response.data.profUser);
       
      return response.data.profUser;
    } catch (error) {
      throw new Error('Ошибка на запросе');
    }
  }
  static getCreateProfile = async (body: ProfileWhizautIdAndWhizautUserIdAndNameLastName): Promise<Profile> => {
    try {
      const response: AxiosResponse<{ message: 'success'; profUser: Profile }> =
        await axiosInstance.post(`/profile`, body, {
          headers: {
          "Content-Type": "multipart/form-data",
          }
       });
      return response.data.profUser;
    } catch (error) {
      throw new Error('Ошибка на запросе');
    }
  }

}
export default ProfileApi;
