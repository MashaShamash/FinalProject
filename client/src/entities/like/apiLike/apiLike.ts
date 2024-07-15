import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import type {
  Like,
  LikeId,
  LikeWithoutId,
  LikeWithoutIdAndWithotFigure,
} from '../likeTypes/likeTypes';

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
    console.log(response.data);
    return response.data;
  };

  static deleteLike = async (id: LikeId): Promise<LikeId | string> => {
    const response: AxiosResponse<{ message: string }> = await axiosInstance.delete(`/like/${id}`);
    if (response.data.message === 'success') {
      return id;
    }
    return 'no';
  };
}
export default LikeApi;
