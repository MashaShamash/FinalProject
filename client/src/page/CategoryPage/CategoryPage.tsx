// @ts-nocheck
import React, { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store/store';
import CategoryItem from '../../entities/categories/ui/CategoryItem';
import './Category.css';

function CategoryPage(): JSX.Element {
  const { categories } = useSelector((state: RootState) => state.categories);
  console.log(11111, categories);

  const scrollLeft = (): void => {
    const container = document.getElementById('categoryContainer');
    if (container) {
      container.scrollLeft -= 1000; // Adjust the scroll amount as needed
    }
  };

  const scrollRight = (): void => {
    const container = document.getElementById('categoryContainer');
    if (container) {
      container.scrollLeft += 1000; // Adjust the scroll amount as needed
    }
  };

  return (
    <div className="main-div-categor">
      <div className="getMainDiv">
        <div id="categoryContainer" className="categoryDiv">
          {categories &&
            categories.map((category) => <CategoryItem category={category} key={category.id} />)}
        </div>
        <div className="category-controls">
          <button type="button" onClick={scrollLeft}>
            <SlArrowLeft />
          </button>
          <button type="button" onClick={scrollRight}>
            <SlArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
