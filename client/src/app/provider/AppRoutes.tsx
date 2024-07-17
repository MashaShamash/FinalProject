import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../page/AuthPage/RegistrationPage';
import AuthorizationPage from '../../page/AuthPage/AuthorizationPage';
import CategoryPage from '../../page/CategoryPage/CategoryPage';
import FigurePage from '../../page/FigurePage/FigurePage';
import CategoriesParams from '../../entities/categories/ui/CategoriesParams';
import FiguresParams from '../../entities/figures/ui/FiguresParams';
import MagazinPage from '../../page/MagazinPage/MagazinPage';
import FavoritePage from '../../page/FavoritePage/FavoritePage';
<<<<<<< HEAD
import ProfilePage from '../../page/Profile/ProfilePage';

function AppRoutes(): JSX.Element {
  return (
   
  <Routes>
      <Route path='/'/> 
      <Route path='/categories' element={<CategoryPage />}/> 
      <Route path='/figures' element={<FigurePage />}/> 
      <Route path='/magazin' element={<MagazinPage />}/>
      <Route path='/categories/:catId' element={<CategoriesParams />}/>
     <Route path='/like' element={<FavoritePage />}/>
      <Route path="/registration" element={<RegistrationPage />}/>
      <Route path="/autorization" element={<AuthorizationPage />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path='*' element={<ErrorPage />} />
=======
import ErrorPage from '../../page/ErrorPage/ErrorPage';
import ProfilePage from '../../page/ProfilePage/ProfilePage';
import BasketPage from '../../page/BasketPage/BasketPage';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/figures" element={<FigurePage />} />
      <Route path="/magazin" element={<MagazinPage />} />
      <Route path="/categories/:catId" element={<CategoriesParams />} />
      <Route path="/figures/:figId" element={<FiguresParams />} />
      <Route path="/likes" element={<FavoritePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/autorization" element={<AuthorizationPage />} />
      <Route path="/profile" />
      <Route path="/basket" element={<BasketPage />} />
      <Route path="*" element={<ErrorPage />} />
>>>>>>> dev
    </Routes>
  );
}
export default AppRoutes;
