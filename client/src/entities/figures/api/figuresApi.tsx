import type { AxiosResponse } from 'axios';
import type { Figure, FigureId, FigureWithoutIdAndWithoutUserIdAndWithoutNamelastNamePseudonym } from '../types/figureTypes';
import axiosInstance from '../../../services/axiosInstance';
import type { Figure, FigureId, FigureWithoutId } from '../types/figureTypes';
import type { BasketLine } from '../../basket/types/basketTypes';

class FigureApi {
  static getAllFigure = async (): Promise<Figure[]> => {
    const response: AxiosResponse<{ message: string; figures: Figure[] }> =
      await axiosInstance.get('/figures', {
        headers: {
        "Content-Type": "multipart/form-data",
        }
     });

    return response.data.figures;
  };

  static createFigure = async (body: FigureWithoutIdAndWithoutUserIdAndWithoutNamelastNamePseudonym): Promise<Figure> => {
    try {
    const response: AxiosResponse<{ message: string; figure: Figure }> =
    await  axiosInstance.post("/figures",body,  {
      headers: {
      "Content-Type": "multipart/form-data",
      }
   })
    return response.data.figure;
    } catch (error) {
      console.log(error);
    }
  };

  static deleteFigure = async (id: FigureId): Promise<FigureId | string> => {
    const response: AxiosResponse<{ message: string }> = await axiosInstance.delete(
      `/figures/${id}`,
    );
    if (response.data.message === 'success') {
      return id;
    }
    return 'noy';
  };

  static updateFigure = async (obj: {
    id: FigureId;
    body: FigureWithoutIdAndWithoutUserIdAndWithoutNamelastNamePseudonym;
  }): Promise<Figure> => {
    const response: AxiosResponse<{ figure: Figure }> = await axiosInstance.put(
      `/figures/${obj.id}`,
      obj.body, {
        headers: {
        "Content-Type": "multipart/form-data",
        }
     })
    return response.data.figure;
  };

  static AddToBasket = async (
    id: FigureId,
  ): Promise<{ message: string; basketLine: BasketLine }> => {
    console.log(id);

    const response: AxiosResponse<{ message: string; basketLine: BasketLine }> =
      await axiosInstance.post(`/basket/${id}`);

    return response.data;
  };
}

export default FigureApi;
