import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Like, LikeWithoutId } from './likeTypes/likeTypes';
import LikeApi from './apiLike/apiLike';

type StateLike = { like: Like[] };
const initialState: StateLike = {
  like: [],
};
export const getAllLikeThunk = createAsyncThunk('load/like', () => LikeApi.getAllLike());

export const createLikeThunk = createAsyncThunk('add/categories', (body: LikeWithoutId) =>
  LikeApi.createLike(body),
);

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLikeThunk.fulfilled, (state, action) => {
        state.like = action.payload;
      })
      .addCase(createLikeThunk.fulfilled, (state, action) => {
        state.like.push(action.payload);
      });
  },
});
