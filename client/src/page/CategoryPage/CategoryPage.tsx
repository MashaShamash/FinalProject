import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store/store';
import CategoryItem from '../../entities/categories/ui/CategoryItem';
import './Category.css'

function CategoryPage(): JSX.Element {
  const { categories } = useSelector((state: RootState) => state.categories);
  // const [active, setActive] = useState(false)
  console.log(11111, categories);

  return (
    <div className='categoryDiv'>
      {/* <button onClick={()=>setActive((prev)=>!prev)}>
           добавить фильм
          </button>
          {active &&
            <FormAddCategory/>
          } */}
      {categories &&
        categories.map((category) => <CategoryItem category={category} key={category.id} />)}
    </div>
  );
}

export default CategoryPage;
