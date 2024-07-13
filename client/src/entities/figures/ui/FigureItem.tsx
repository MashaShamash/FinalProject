import React, { useState } from 'react';
// import { useAppDispatch } from '../../../app/store/store';
import { removeFigureThunk } from '../figuresSlice';
import type { Figure } from '../types/figureTypes';

type FigureItemProps = {
    figure: Figure;
};
function FigureItem({ figure }: FigureItemProps): JSX.Element {
//   const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  // const onHadleDelete = (): void => {
  //   void dispatch(removeCategoryThunk(category.id));
  // };
  return (
    <div>
      <h3>{figure.title}</h3>
      <img src={figure.img} alt="" />
      {/* <h3>{figure.date}</h3> */}
      <h3>{figure.materials}</h3>
      <h3>{figure.height}</h3>
      <h3>{figure.price}</h3>
      <h3>{figure.width}</h3>
      <h3>{figure.sell}</h3>
      <div>
        {/* <button onClick={onHadleDelete}>удалить</button>
        <button onClick={() => setActive((prev) => !prev)}>изменить</button> */}
        {/* {active && <FormUpdateCategories movie={category} />} */}
      </div>
    </div>
  );
}

export default FigureItem;
