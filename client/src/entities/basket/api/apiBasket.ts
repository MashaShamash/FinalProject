import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import type { Basket, BasketLine } from '../types/basketTypes';
import type { UserId } from '../../auth/types/userTypes';
import type { FigureId } from '../../figures/types/figureTypes';

class BasketApi {
  static getAllBasket = async (id: UserId): Promise<{ message: string; baskets: Basket[] }> => {
    const response: AxiosResponse<{ message: string; baskets: Basket[] }> = await axiosInstance.get(
      `/basket/${id}`,
    );
    return response.data;
  };

  static deleteBasket = async (
    id: Basket['id'],
  ): Promise<{ message: string; baskets: Basket[] }> => {
    const response: AxiosResponse<{ message: string; baskets: Basket[] }> =
      await axiosInstance.delete(`/basket/${id}`);
    return response.data;
  };

  static updateBasket = async (
    id: Basket['id'],
  ): Promise<{ message: string; baskets: Basket[] }> => {
    const response: AxiosResponse<{ message: string; baskets: Basket[] }> = await axiosInstance.put(
      `/basket/${id}`,
    );
    return response.data;
  };

  static updateBasketLine = async ({
    basketLine,
    action,
  }: {
    basketLine: BasketLine;
    action: string;
  }): Promise<{ message: string; baskets: Basket[] }> => {
    const response: AxiosResponse<{ message: string; baskets: Basket[] }> = await axiosInstance.put(
      `/basket/basketLine/${basketLine.id}`,
      { basketLine, action },
    );
    return response.data;
  };

  static deleteBasketLine = async (
    id: BasketLine['id'],
  ): Promise<{ message: string; baskets: Basket[] }> => {
    const response: AxiosResponse<{ message: string; baskets: Basket[] }> =
      await axiosInstance.delete(`/basket/basketLine/${id}`);
    return response.data;
  };

 
}
export default BasketApi;
