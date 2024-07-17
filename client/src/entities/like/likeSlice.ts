import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Like, LikeWithoutId, LikeWithoutIdAndWithotFigure } from './types/likeTypes';
import LikeApi from './api/apiLike';

type StateLike = { like: Like[] };
const initialState: StateLike = {
  like: [],
};
export const getAllLikeThunk = createAsyncThunk('load/like', () => LikeApi.getAllLike());

export const createLikeThunk = createAsyncThunk('add/like', (body: LikeWithoutIdAndWithotFigure) =>
  LikeApi.createLike(body),
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
            console.log(1);
            state.like.push(action.payload.like);
            break;
          case 'успешно удалено':
            console.log(action.payload);

            state.like = state.like.filter((like: Like) => like.id !== action.payload.like.id);
            console.log(state.like);

            break;

          default:
            break;
        }
      });
  },
});

export default likeSlice;
