import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { Profile } from '../types/profileTypes';

const profileRequest = axios.create({ baseURL: '/api/profile' });

class ProfileApi {
  static getProfile = async (): Promise<Profile> => {
    try {
      const response: AxiosResponse<{ message: 'success'; profile: Profile }> =
        await profileRequest.get('/');
      return response.data.profile;
    } catch (error) {
      throw new Error('Ошибка');
    }
  };
}
export default ProfileApi;
