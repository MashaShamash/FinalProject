import React, { useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import elbrusLogo from './assets/elbrus.svg';
import './App.css';
import { useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';
import Navbar from '../widgets/Navbar/Navbar';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {

    void dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h1>Hay</h1>
    </div>
  );
}

export default App;
