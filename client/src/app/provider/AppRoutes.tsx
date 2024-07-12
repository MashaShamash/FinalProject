import React from 'react';
import { Route, Routes } from 'react-router-dom';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/signIn" />
      <Route path="/signUp" />
      <Route path="/profile" />
    </Routes>
  );
}
export default AppRoutes;
