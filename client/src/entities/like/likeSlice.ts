import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Like, LikeWithoutId, LikeWithoutIdAndWithotFigure } from './likeTypes/likeTypes';
import LikeApi from './apiLike/apiLike';

type StateLike = { like: Like[] };
const initialState: StateLike = {
  like: [],
};
export const getAllLikeThunk = createAsyncThunk('load/like', () => LikeApi.getAllLike());

export const createLikeThunk = createAsyncThunk(
  'add/categories',
  (body: LikeWithoutIdAndWithotFigure) => LikeApi.createLike(body),
);

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLikeThunk.fulfilled, (state, action) => {
        console.log(action.payload);

        state.like = action.payload;
      })
      .addCase(createLikeThunk.fulfilled, (state, action) => {
        switch (action.payload.message) {
          case 'success':
            state.like.push(action.payload.like);
            break;
          case 'успешно удалено':
            state.like = state.like.filter(
              (like: Like) => like.figureId !== action.payload.like.id,
            );
            break;

          default:
            break;
        }
      });
  },
});

export default likeSlice;
