import React, { useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import elbrusLogo from './assets/elbrus.svg';
// import './App.css';
import { useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';
import Navbar from '../widgets/Navbar/Navbar';
import AppRoutes from './provider/AppRoutes';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getCategoriesThunk());
  }, [dispatch]);
  console.log(2222);

  return (
    <div>
      <Navbar />
      <h1>Hay</h1>
      <AppRoutes />
    </div>
  );
}

export default App;
