import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import type { Figure, FigureId, FigureWithoutId } from '../types/figureTypes';

class FigureApi {
  static getAllFigure = async (): Promise<Figure[]> => {
    const response: AxiosResponse<{ message: string; figures: Figure[] }> =
      await axiosInstance.get('/figures');

    return response.data.figures;
  };

  static createFigure = async (body: FigureWithoutId): Promise<Figure> => {
    const response: AxiosResponse<{ message: string; figure: Figure }> =
      await axiosInstance.post('/figures', body);
    return response.data.figure;
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
    body: FigureWithoutId;
  }): Promise<Figure> => {
    const response: AxiosResponse<{ figure: Figure }> = await axiosInstance.put(
      `/figures/${obj.id}`,
      obj.body,
    );
    return response.data.figure;
  };
}

export default FigureApi;