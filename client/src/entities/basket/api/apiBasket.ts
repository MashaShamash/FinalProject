import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import type { Basket, BasketLine } from '../types/basketTypes';
import type { UserId } from '../../auth/types/userTypes';

class BasketApi {
  static getAllBasket = async (id: UserId): Promise<{ message: string; basket: Basket }> => {
    const response: AxiosResponse<{ message: string; basket: Basket }> = await axiosInstance.get(
      `/basket/${id}`,
    );
    console.log(345678, id);
    return response.data;
  };

  static deleteBasket = async (
    id: Basket['id'],
  ): Promise<{ message: string; baskets: Basket[] }> => {
    const response: AxiosResponse<{ message: string; baskets: Basket[] }> =
      await axiosInstance.delete(`/basket/basket/${id}`);
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

  // static AddToBasket = async (
  //   id: FigureId,
  // ): Promise<{ message: string; basketLine: BasketLine }> => {
  //   const response: AxiosResponse<{ message: string; basketLine: BasketLine }> =
  //     await axiosInstance.post(`/magazin/addToBasket/${id}`);
  //   return response.data;
  // };
}
export default BasketApi;
