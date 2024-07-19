import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import type { Like, LikeWithoutIdAndWithotFigure } from '../types/likeTypes';

class LikeApi {
  static getAllLike = async (): Promise<Like[]> => {
    const response: AxiosResponse<{ message: string; likes: Like[] }> =
      await axiosInstance.get('/like');
    return response.data.likes;
  };

  static createLike = async (
    body: LikeWithoutIdAndWithotFigure,
  ): Promise<{ message: string; like: Like }> => {
    const response: AxiosResponse<{ message: string; like: Like }> = await axiosInstance.post(
      '/like',
      body,
    );

    return response.data;
  };
}
export default LikeApi;
