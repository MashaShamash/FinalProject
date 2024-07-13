import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from '../../page/CategoryPage/CategoryPage';
import FigurePage from '../../page/FigurePage/FigurePage';
import LikePage from '../../page/FavoritePage/FavoritePage';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/signIn" />
      <Route path="/signUp" />
      <Route path="/profile" />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/figures" element={<FigurePage />} />
      <Route path="/like" element={<LikePage />} />
    </Routes>
  );
}
export default AppRoutes;
