import type { Figure } from '../../figures/types/figureTypes';

export type Like = {
  id: number;
  userId?: number;
  figureId: number;
  Figure: Figure;
};
export type LikeId = Like['id'];
export type LikeWithoutId = Omit<Like, 'id'>;
export type LikeWithoutIdAndWithotFigure = Omit<LikeWithoutId, 'Figure'>;
