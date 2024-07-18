import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { RootState, useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';
import Navbar from '../widgets/Navbar/Navbar';
import AppRoutes from './provider/AppRoutes';
import { getRefreshTokensThunk } from '../entities/auth/authSlice';
import { getFiguresThunk } from '../entities/figures/figuresSlice';
import { Loader } from '../widgets/Loading/Loader';
import StickyFooter from '../widgets/StickyFooter/StyckyFooter';
import { getAllProfileThunk } from '../entities/profile/profileSlice';
import { getUsersThunk } from '../entities/users/usersSlice';
import { loadBaskets } from '../entities/basket/basketSlice';
import { useSelector } from 'react-redux';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log();

  useEffect(() => {
    if (user) void dispatch(loadBaskets(user?.id));
    void dispatch(getRefreshTokensThunk());
    void dispatch(getCategoriesThunk());
    void dispatch(getFiguresThunk());
    void dispatch(getAllProfileThunk());
    void dispatch(getUsersThunk());
    const id = setTimeout(() => {
      setLoading(true);
    }, 2000);
    return () => clearTimeout(id);
  }, [dispatch, loading]);

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

          <header>
            <h1>Welcome to Website</h1>
          </header>
        </div>
      )}
      <StickyFooter />
    </>
  );
}

export default App;
