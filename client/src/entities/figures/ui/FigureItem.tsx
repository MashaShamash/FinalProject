import React, { useEffect, useState } from 'react';
import './figure.css';
import { useSelector } from 'react-redux';

import { LiaStar } from 'react-icons/lia';
import { RxStarFilled } from 'react-icons/rx';
import type { Figure } from '../types/figureTypes';
import type { RootState } from '../../../app/store/store';
import { useAppDispatch } from '../../../app/store/store';
import { createLikeThunk, getAllLikeThunk } from '../../like/likeSlice';
import { addToBasket } from '../figuresSlice';

type FigureItemProps = {
  figure: Figure;
};

function FigureItem({ figure }: FigureItemProps): JSX.Element {
  const [activ, setActiv] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const dispatch = useAppDispatch();

  let like;
  const likes = useSelector((state: RootState) => state.like.like);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleFavorite = (): void => {
    void dispatch(createLikeThunk({ figureId: figure.id }));
  };
  if (likes && figure) {
    like = likes.find((lik) => lik.Figure.id === figure.id);
  }
  const handleAddToBasket = ()=> {
    void dispatch(addToBasket(figure.id));
    setOpenBasket(true);
  };
  return (
    <div className="figureCard">
      <div className="figureCardContent">
        <img src={figure.img} alt="foto" />

        <h3>{figure.title}</h3>
        <h3>{figure.price} $</h3>
        <div className="buttonGrop">
          <button type="button" className="detailsButton" onClick={() => setActiv((prev) => !prev)}>
            подробнее
          </button>
          {activ ? (
            <>
              <p>{figure.materials}</p>
              <p>{figure.height} см</p>
              <p>{figure.width} см</p>
              <p>{figure.sell}</p>
            </>
          ) : (
            <>
             {user && (
                <button className="btn" type="button" onClick={() => handleAddToBasket()}>
                  добавить в корзину
                </button>
              )}
              {user && (
                <button type="button" onClick={handleFavorite}>
                  {like ? <RxStarFilled /> : <LiaStar />}
                </button>
              )}
             
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FigureItem;
