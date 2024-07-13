import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import type { Like, LikeId, LikeWithoutId } from '../likeTypes/likeTypes';

class LikeApi {
  static getAllLike = async (): Promise<Like[]> => {
    const response: AxiosResponse<{ message: string; like: Like[] }> =
      await axiosInstance.get('/like');
    return response.data.like;
  };

  static createLike = async (body: LikeWithoutId): Promise<Like> => {
    const response: AxiosResponse<{ message: string; like: Like }> = await axiosInstance.post(
      '/like',
      body,
    );
    return response.data.like;
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
