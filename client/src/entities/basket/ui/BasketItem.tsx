import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store/store';
import type { BasketLine } from '../types/basketTypes';

type BasketItemProps = {
  basketLine: BasketLine;
};

function BasketItem({ basketLine }: BasketItemProps): JSX.Element {
  const figures = useSelector((state: RootState) => state.figures.figures);
  const figure = figures.find((figure) => figure.id === basketLine.figureId);
  console.log(654, 'basketItem', figure);

  return (
    <div>
      {figure && (
        <div style={{ display: 'flex', margin: '20px' }} className="BasketItem">
          <img style={{ width: '500px' }} src={figure.img} alt="book" />

          <div style={{ margin: '20px' }}>
            <h3>{figure.title}</h3>
            <p>{figure.materials}</p>
          </div>
          <div>
            <p>{figure.price} ₽</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasketItem;
