import React, { useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import elbrusLogo from './assets/elbrus.svg';
// import './App.css';
import Navbar from '../widgets/Navbar/Navbar';
import AppRoutes from './provider/AppRoutes';
import { useAppDispatch } from './store/store';
import { getRefreshTokensThunk } from '../entities/auth/authSlice';

function App(): JSX.Element {

    const dispatch = useAppDispatch()

    
useEffect(() => {
  void dispatch(getRefreshTokensThunk())
},[])


  return (
    <div>
      <Navbar />
      <AppRoutes />
      <h1>Hay</h1>
    </div>
  );
}

export default App;
