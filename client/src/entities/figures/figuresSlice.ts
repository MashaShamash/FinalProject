import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Figure, FigureId, FigureWithoutId } from './types/figureTypes';
import FigureApi from './api/figuresApi';

type StateFigure = {
  figures: Figure[];
};
const initialState: StateFigure = {
  figures: [],
};

export const getFiguresThunk = createAsyncThunk('load/figures', () => FigureApi.getAllFigure());

export const createFigureThunk = createAsyncThunk('add/figures', (body: FigureWithoutId) =>
  FigureApi.createFigure(body),
);
export const addToBasket = createAsyncThunk('magazin/addToBasket', (id: FigureId) =>
  FigureApi.AddToBasket(id),
);

export const removeFigureThunk = createAsyncThunk('remove/figures', (id: FigureId) =>
  FigureApi.deleteFigure(id),
);

export const updateFigureThunk = createAsyncThunk(
  'update/figures',
  (obj: { id: FigureId; body: FigureWithoutId }) => FigureApi.updateFigure(obj),
);

const figureSlice = createSlice({
  name: 'figures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFiguresThunk.fulfilled, (state, action) => {
        state.figures = action.payload;
      })
      .addCase(createFigureThunk.fulfilled, (state, action) => {
        state.figures.push(action.payload);
      })
      .addCase(removeFigureThunk.fulfilled, (state, action) => {
        state.figures = state.figures.filter((el) => el.id !== action.payload);
      })
      .addCase(updateFigureThunk.fulfilled, (state, action) => {
        state.figures = state.figures.map((figure) =>
          figure.id === action.payload.id ? action.payload : figure,
        );
      });
  },
});

export default figureSlice;
