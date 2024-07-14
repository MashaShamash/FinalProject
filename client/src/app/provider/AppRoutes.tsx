import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../page/AuthPage/RegistrationPage';
import AuthorizationPage from '../../page/AuthPage/AuthorizationPage';
import CategoryPage from '../../page/CategoryPage/CategoryPage';
import FigurePage from '../../page/FigurePage/FigurePage';


import CategoriesParams from '../../entities/categories/ui/CategoriesParams';



function AppRoutes(): JSX.Element {
  return (
   
  <Routes>
      <Route path='/'/> 
      <Route path='/categories' element={<CategoryPage />}/> 
      <Route path='/figures' element={<FigurePage />}/> 
      <Route path='/categories/:catId' element={<CategoriesParams />}/>
      {/* <Route path='/like' element={<FavoritePage />}/>  */}
      <Route path="/registration" element={<RegistrationPage />}/>
      <Route path="/autorization" element={<AuthorizationPage />}/>
      <Route path="/profile" />
    </Routes>
  );
}
export default AppRoutes;
