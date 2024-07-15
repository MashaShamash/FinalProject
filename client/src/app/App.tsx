import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';
import Navbar from '../widgets/Navbar/Navbar';
import AppRoutes from './provider/AppRoutes';
import { getRefreshTokensThunk } from '../entities/auth/authSlice';
import { getFiguresThunk } from '../entities/figures/figuresSlice';
import { getAllLikeThunk } from '../entities/like/likeSlice';
import { Loader } from '../widgets/Loading/Loader';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void dispatch(getRefreshTokensThunk());
    void dispatch(getCategoriesThunk());
    void dispatch(getFiguresThunk());
    void dispatch(getAllLikeThunk());
    const id = setTimeout(() => {
      setLoading(true);
    }, 2000);
    return () => clearTimeout(id);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="app">
          <Navbar />
          <AppRoutes />
        </div>
      ) : (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      )}
    </>
  );
}

export default App;
