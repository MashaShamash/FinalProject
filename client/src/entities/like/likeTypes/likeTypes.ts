export type Like = {
  id: number;
  userId: number;
  figureId: number;
};
export type LikeId = Like['id']
export type LikeWithoutId = Omit< Like, 'id'>