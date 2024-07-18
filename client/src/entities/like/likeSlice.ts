import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Like, LikeWithoutId, LikeWithoutIdAndWithotFigure } from './types/likeTypes';
import LikeApi from './api/apiLike';

// Функция для загрузки состояния из localStorage
const loadState = (): Like[] => {
  try {
    const serializedState = localStorage.getItem('like');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn('Could not load likes from localStorage', e);
    return [];
  }
};

// Функция для сохранения состояния в localStorage
const saveState = (state: Like[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('like', serializedState);
  } catch (e) {
    console.warn('Could not save likes to localStorage', e);
  }
};

type StateLike = { like: Like[] };
const initialState: StateLike = {
  like: loadState(),
};

export const getAllLikeThunk = createAsyncThunk('load/like', async () => {
  const response = await LikeApi.getAllLike();
  saveState(response); // Сохраняем состояние в localStorage
  return response;
});

export const createLikeThunk = createAsyncThunk(
  'add/like',
  async (body: LikeWithoutIdAndWithotFigure) => {
    const response = await LikeApi.createLike(body);
    return response;
  },
);

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLikeThunk.fulfilled, (state, action) => {
        state.like = action.payload;
        saveState(state.like); // Сохраняем состояние в localStorage
      })
      .addCase(createLikeThunk.fulfilled, (state, action) => {
        switch (action.payload.message) {
          case 'success':
            state.like.push(action.payload.like);
            saveState(state.like); // Сохраняем состояние в localStorage
            break;
          case 'успешно удалено':
            state.like = state.like.filter((like: Like) => like.id !== action.payload.like.id);
            saveState(state.like); // Сохраняем состояние в localStorage
            break;
          default:
            break;
        }
      });
  },
});

export default likeSlice;