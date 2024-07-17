import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store/store';
import CategoryItem from '../../entities/categories/ui/CategoryItem';
import './Category.css';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';
import FigurePage from '../FigurePage/FigurePage';

function CategoryPage(): JSX.Element {
  const { categories } = useSelector((state: RootState) => state.categories);
  // const [active, setActive] = useState(false)
  console.log(11111, categories);

  const scrollLeft = () => {
    const container = document.getElementById('categoryContainer');
    if (container) {
      container.scrollLeft -= 1000; // Adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('categoryContainer');
    if (container) {
      container.scrollLeft += 1000; // Adjust the scroll amount as needed
    }
  };

  return (
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
<div className='divFigure'><FigurePage /></div>
      
    </div>
  );
}

export default CategoryPage;
