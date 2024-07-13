import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../page/AuthPage/RegistrationPage';
import AuthorizationPage from '../../page/AuthPage/AuthorizationPage';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/registration" element={<RegistrationPage />}/>
      <Route path="/autorization" element={<AuthorizationPage />}/>
      <Route path="/profile" />
    </Routes>
  );
}
export default AppRoutes;
