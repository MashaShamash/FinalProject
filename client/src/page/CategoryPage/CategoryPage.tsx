import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store/store';
import CategoryItem from '../../entities/categories/ui/CategoryItem';
import './Category.css';

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
    <>
      <h2>Категории</h2>
      <div className="getMainDiv">
        <div id="categoryContainer" className="categoryDiv">
          {categories &&
            categories.map((category) => <CategoryItem category={category} key={category.id} />)}
        </div>
        <div className="category-controls">
          <button onClick={scrollLeft}>←</button>
          <button onClick={scrollRight}>→</button>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
