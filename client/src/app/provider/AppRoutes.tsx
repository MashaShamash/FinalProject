import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../page/AuthPage/RegistrationPage';
import AuthorizationPage from '../../page/AuthPage/AuthorizationPage';
import CategoryPage from '../../page/CategoryPage/CategoryPage';
import FigurePage from '../../page/FigurePage/FigurePage';
import CategoriesParams from '../../entities/categories/ui/CategoriesParams';
import FavoritePage from '../../page/FavoritePage/FavoritePage';
import ErrorPage from '../../page/ErrorPage/ErrorPage';
import ProfilePage from '../../page/ProfilePage/ProfilePage';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/figures" element={<FigurePage />} />
      <Route path="/categories/:catId" element={<CategoriesParams />} />
      <Route path="/like" element={<FavoritePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/autorization" element={<AuthorizationPage />} />
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default AppRoutes;
