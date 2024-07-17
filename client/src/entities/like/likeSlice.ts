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
  
        state.like = action.payload;
      })
      .addCase(createLikeThunk.fulfilled, (state, action) => {
        switch (action.payload.message) {
          case 'success':
        
            state.like.push(action.payload.like);
            break;
          case 'успешно удалено':
          

            state.like = state.like.filter((like: Like) => like.id !== action.payload.like.id);
        

            break;

          default:
            break;
        }
      });
  },
});

export default likeSlice;
