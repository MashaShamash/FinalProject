import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { Profile, ProfileId, ProfileWhizautIdAndWhizautUserId } from '../types/profileTypes';
import axiosInstance from '../../../services/axiosInstance';



class ProfileApi {

  static getAllProfile = async (): Promise<Profile[]> => {
    try {
      const response: AxiosResponse<{ message: 'success'; profUsers: Profile[] }> =
        await axiosInstance.get('/profile');
      return response.data.profUsers;
    } catch (error) {
      throw new Error('Ошибка на запросе');
    }
  };

  static getUpdateProfile = async (obj: {id:ProfileId, body: ProfileWhizautIdAndWhizautUserId}): Promise<Profile> => {
    try {
      const response: AxiosResponse<{ message: 'success'; profUser: Profile }> =
        await axiosInstance.put(`/profile/${obj.id}`, obj.body);
      return response.data.profUser;
    } catch (error) {
      throw new Error('Ошибка на запросе');
    }
  }
}
export default ProfileApi;
