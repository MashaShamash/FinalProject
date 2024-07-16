import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import categorySlice from '../../entities/categories/categoriesSlice';
import authSlice from '../../entities/auth/authSlice';
import figureSlice from '../../entities/figures/figuresSlice';
import likeSlice from '../../entities/like/likeSlice';
import basketSlice from '../../entities/basket/basketSlice';

const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    auth: authSlice.reducer,
    like: likeSlice.reducer,
    figures: figureSlice.reducer,
    basket: basketSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
