import React, { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import elbrusLogo from './assets/elbrus.svg';
// import './App.css';
import { useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';
import Navbar from '../widgets/Navbar/Navbar';
import AppRoutes from './provider/AppRoutes';
import { getFiguresThunk } from '../entities/figures/figuresSlice';
import { getAllLikeThunk } from '../entities/like/likeSlice';

function App(): JSX.Element {
  // const [like, setLike]=useState()
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getAllLikeThunk())
    void dispatch(getCategoriesThunk());
    void dispatch(getFiguresThunk());
  }, [dispatch]);
  console.log(2222);

  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
