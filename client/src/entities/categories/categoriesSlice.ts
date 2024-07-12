import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoryApi from './api/categoriesApi';
import type { Category, CategoryId, CategoryWithoutId } from './types/categoryTypes';

type StateCategory = {
  categories: Category[];
};
const initialState: StateCategory = {
  categories: [],
};

export const getCategoriesThunk = createAsyncThunk('load/categories', () =>
  CategoryApi.getAllCategory(),
);

export const createCategoryThunk = createAsyncThunk('add/categories', (body: CategoryWithoutId) =>
  CategoryApi.createCategory(body),
);

export const removeCategoryThunk = createAsyncThunk('remove/categories', (id: CategoryId) =>
  CategoryApi.deleteCategory(id),
);

export const updateCategoryThunk = createAsyncThunk(
  'update/categories',
  (obj: { id: CategoryId; body: CategoryWithoutId }) => CategoryApi.updateCategory(obj),
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        console.log(33333, action.payload);

        state.categories = action.payload;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(removeCategoryThunk.fulfilled, (state, action) => {
        state.categories = state.categories.filter((el) => el.id !== action.payload);
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category,
        );
      });
  },
});

export default categorySlice;
