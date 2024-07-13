import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from '../../entities/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
    // profile: profileSlice.reducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
