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
      <Link to={`/categories/${category.id}`}>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>{category.title}</h1>
        <img src={category.img} alt="" />
      </Link>
    </div>
  );
}

export default CategoryItem;
