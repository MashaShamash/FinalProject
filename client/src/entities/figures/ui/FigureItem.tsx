import React, { useState } from 'react';
// import { useAppDispatch } from '../../../app/store/store';
import { removeFigureThunk } from '../figuresSlice';
import type { Figure } from '../types/figureTypes';
import './figure.css';

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
    <div className="figureCard">
      <img src={figure.img} alt="" />
      <h3>{figure.title}</h3>
      {/* <h3>{figure.date}</h3> */}
      <p>{figure.materials}</p>
      <p>{figure.height}</p>
      <h3>{figure.price}</h3>
      <p>{figure.width}</p>
      <p>{figure.sell}</p>
      <div>
        {/* <button onClick={onHadleDelete}>удалить</button>
        <button onClick={() => setActive((prev) => !prev)}>изменить</button> */}
        {/* {active && <FormUpdateCategories movie={category} />} */}
      </div>
    </div>
  );
}

export default FigureItem;
