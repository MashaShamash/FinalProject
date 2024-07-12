import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/store/store';
import { removeCategoryThunk } from '../categoriesSlice';
import type { Category } from '../types/categoryTypes';

type CategoryItemProps = {
  category: Category;
};
function CategoryItem({ category }: CategoryItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  // const onHadleDelete = (): void => {
  //   void dispatch(removeCategoryThunk(category.id));
  // };
  return (
    <div>
      <h3>{category.title}</h3>
      <img src={category.img} alt="" />
      <div>
        {/* <button onClick={onHadleDelete}>удалить</button>
        <button onClick={() => setActive((prev) => !prev)}>изменить</button> */}
        {/* {active && <FormUpdateCategories movie={category} />} */}
      </div>
    </div>
  );
}

export default CategoryItem;
