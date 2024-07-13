import React, { useEffect } from 'react';
// // import './App.css';
import { useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';
import Navbar from '../widgets/Navbar/Navbar';
import AppRoutes from './provider/AppRoutes';
import { getRefreshTokensThunk } from '../entities/auth/authSlice';
import { getFiguresThunk } from '../entities/figures/figuresSlice';

function App(): JSX.Element {

    const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getRefreshTokensThunk())
    void dispatch(getCategoriesThunk());
    void dispatch(getFiguresThunk());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
