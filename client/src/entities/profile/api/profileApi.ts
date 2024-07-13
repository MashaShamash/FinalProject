import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { Profile, ProfileWithoutId } from '../types/profileTypes';
import type { UserId } from '../../auth/types/userTypes';
import axiosInstance from '../../../services/axiosInstance';

const profileRequest = axios.create({ baseURL: '/api/profile' });

class ProfileApi {
  static getAllProfile = async (): Promise<Profile[]> => {
    try {
      const response: AxiosResponse<{ message: 'success'; profile: Profile[] }> =
        await profileRequest.get('/');
      return response.data.profile;
    } catch (error) {
      throw new Error('Ошибка');
    }
  };

  static updateProfile = async (obj: { id: UserId; body: ProfileWithoutId }): Promise<Profile> => {
    const response: AxiosResponse<{ profile: Profile }> = await axiosInstance.put(
      `/profile/${obj.id}`,
      obj.body,
    );
    return response.data.profile;
  };
}
export default ProfileApi;
