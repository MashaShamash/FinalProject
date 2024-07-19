import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types/categoryTypes';
import './categoryCard.css';

type CategoryItemProps = {
  category: Category;
};
function CategoryItem({ category }: CategoryItemProps): JSX.Element {
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
