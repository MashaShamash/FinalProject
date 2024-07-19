import type { UserId } from '../../auth/types/userTypes';

export type Basket = {
  id: number;
  userId: UserId;
  cartStatus: boolean;
  totalAmount: number;
  orderStatus: string;
  BasketLines: BasketLine[];
};

export type BasketLine = {
  id: number;
  figureId: number;
  basketId: number;
  count: number;
};
