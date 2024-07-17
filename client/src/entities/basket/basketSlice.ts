import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Basket, BasketLine } from './types/basketTypes';
import type { UserId } from '../auth/types/userTypes';
import BasketApi from './api/apiBasket';
import { addToBasket } from '../figures/figuresSlice';

type BasketsReducer = {
  basket: Basket | undefined;
  message: string | undefined;
  errors: string | undefined;
};

const initialState: BasketsReducer = {
  basket: undefined,
  message: undefined,
  errors: undefined,
};

export const loadBaskets = createAsyncThunk('baskets/load', (id: UserId) =>
  BasketApi.getAllBasket(id),
);
export const deleteBasket = createAsyncThunk('basket/delete', (id: Basket['id']) =>
  BasketApi.deleteBasket(id),
);
export const updateBasket = createAsyncThunk('basket/update', (id: Basket['id']) =>
  BasketApi.updateBasket(id),
);
export const updateBasketLine = createAsyncThunk(
  'basketLine/update',
  ({ basketLine, action }: { basketLine: BasketLine; action: string }) =>
    BasketApi.updateBasketLine({ basketLine, action }),
);
export const deleteBasketLine = createAsyncThunk('basketLine/delete', (id: BasketLine['id']) =>
  BasketApi.deleteBasketLine(id),
);

const basketSlice = createSlice({
  name: 'baskets',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(loadBaskets.fulfilled, (state, action) => {
        state.basket = action.payload.basket;
        state.message = action.payload.message;
      })
      .addCase(loadBaskets.rejected, (state, action) => {
        state.errors = action.error.message;
      })
      .addCase(deleteBasket.fulfilled, (state, action) => {
        state.basket = undefined;
        state.message = action.payload.message;
      })
      .addCase(updateBasketLine.fulfilled, (state, action) => {
        state.basket = action.payload.basket;
        state.message = action.payload.message;
      })
      .addCase(deleteBasketLine.fulfilled, (state, action) => {
        state.basket = action.payload.basket;
        state.message = action.payload.message;
      })
      .addCase(updateBasket.fulfilled, (state, action) => {
        state.basket = action.payload.basket;
        state.message = action.payload.message;
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.basket.push(action.payload.basketLine);
      });
  },
});

export default basketSlice;

// let figures;
// action.payload.message === 'success'
//   ? (figures = state.figures.map((figure) => {
//       if (figure.id === action.payload.basketLine.figureId) {
//         figure.BasketLine.push(action.payload.basketLine);
//       }
//       return figure;
//     }))
//   : (figures = state.figures.map((figure) => {
//       figure.BasketLine.map((basketLine: { id: number; count: number }) => {
//         if (basketLine.id === action.payload.basketLine.id) basketLine.count += 1;
//         return basketLine;
//       });
//       return figure;
//     }));
// state.figures = figures;
// state.message = action.payload.message;
