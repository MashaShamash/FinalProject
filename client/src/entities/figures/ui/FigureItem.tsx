//@ts-nocheck
import React, { useEffect, useState } from 'react';
import './figure.css';
import { useSelector } from 'react-redux';

import { LiaStar } from 'react-icons/lia';
import { RxStarFilled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import type { Figure } from '../types/figureTypes';
import type { RootState } from '../../../app/store/store';
import { useAppDispatch } from '../../../app/store/store';
import { createLikeThunk } from '../../like/likeSlice';

import { addToBasket, loadBaskets } from '../../basket/basketSlice';

type FigureItemProps = {
  figure: Figure;
};

function FigureItem({ figure }: FigureItemProps): JSX.Element {
  const [activ, setActiv] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let like;
  const likes = useSelector((state: RootState) => state.like.like);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleFavorite = (): void => {
    void dispatch(createLikeThunk({ figureId: figure.id }));
  };
  if (likes && figure) {
    like = likes.find((lik) => lik.Figure.id === figure.id);
  }
  const handleAddToBasket = (): void => {
    void dispatch(addToBasket(figure.id));
    setOpenBasket(true);
  };

  useEffect(() => {
    if (user) void dispatch(loadBaskets(user?.id));
  }, [dispatch]);
  return (
    <div className="figureCard">
      <img src={figure.img} alt="foto" />

      <h3>{figure.title}</h3>
      <h3>{figure.price} $</h3>
      <div className="buttonGrop">
        <button
          style={{ backgroundColor: 'transparent', border: 'none', fontSize: '18px' }}
          type="button"
          className="detailsButton"
          onClick={() => navigate(`/figures/${figure.id}`)}
        >
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
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '0',
                  border: 'solid 1px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  // boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
                className="btn"
                type="button"
                onClick={() => handleAddToBasket()}
              >
                добавить в корзину
              </button>
            )}
            {user && (
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '32px',
                  padding: '0',
                  marginLeft: '70px',
                }}
                type="buttonLike"
                onClick={handleFavorite}
              >
                {like ? <RxStarFilled /> : <LiaStar />}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FigureItem;
