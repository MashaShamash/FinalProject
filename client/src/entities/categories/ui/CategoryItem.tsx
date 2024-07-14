import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/store/store';
import { removeCategoryThunk } from '../categoriesSlice';
import type { Category } from '../types/categoryTypes';
import './categoryCard.css';
import { Link } from 'react-router-dom';

type CategoryItemProps = {
  category: Category;
};
function CategoryItem({ category }: CategoryItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  
  return (
    <div className="categoryItem">
      <h3>{category.title}</h3>
      <img src={category.img} alt="" />
      <Link to={`/categories/${category.id}`}>Подробнее</Link>
    </div>
  );
}

export default CategoryItem;
