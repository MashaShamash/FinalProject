import React, { useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import elbrusLogo from './assets/elbrus.svg';
import './App.css';
import { useAppDispatch } from './store/store';
import { getCategoriesThunk } from '../entities/categories/categoriesSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {

    void dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Hay</h1>
    </div>
  );
}

export default App;
