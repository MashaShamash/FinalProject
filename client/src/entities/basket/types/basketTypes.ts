import type { UserId } from '../../auth/types';

export type Basket = {
  id: number;
  userId: UserId;
  cartStatus: boolean;
  totalAmount: number;
  orderStatus: string;
  BasketLine: BasketLine[];
};

export type BasketLine = {
  id: number;
  figureId: number;
  basketId: number;
  count: number;
};
