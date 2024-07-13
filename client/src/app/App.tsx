import React, { useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import elbrusLogo from './assets/elbrus.svg';
// import './App.css';
import { useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';
import Navbar from '../widgets/Navbar/Navbar';
import AppRoutes from './provider/AppRoutes';
import { getFiguresThunk } from '../entities/figures/figuresSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
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
