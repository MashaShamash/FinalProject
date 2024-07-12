import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from '../../page/CategoryPage/CategoryPage';

type AppRoutesProps = {};
function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='/'/> 
      <Route path='/signIn'/> 
      <Route path='/signUp'/> 
      <Route path='/profile'/> 
      <Route path='/categories' element={<CategoryPage />}/> 
    </Routes>
  );
}
export default AppRoutes;
