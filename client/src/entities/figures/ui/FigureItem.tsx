import React, { useState } from 'react';
import './figure.css';
import { useSelector } from 'react-redux';
import { LiaStar } from 'react-icons/lia';
import { RxStarFilled } from 'react-icons/rx';
import type { Figure } from '../types/figureTypes';
import type { RootState } from '../../../app/store/store';
import { useAppDispatch } from '../../../app/store/store';
import { createLikeThunk } from '../../like/likeSlice';
// import { Link } from 'react-router-dom';

type FigureItemProps = {
  figure: Figure;
};

function FigureItem({ figure }: FigureItemProps): JSX.Element {
  const [activ, setActiv] = useState(false);
  let like;
  const likes = useSelector((state: RootState) => state.like.like);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleFavorite = (): void => {
    void dispatch(createLikeThunk({ figureId: figure.id }));
  };
  if (likes && figure) {
    like = likes.find((lik) => lik.Figure.id === figure.id);
  }
  return (
    <div className="figureCard">
      <div className="figureCardContent">
        <img src={figure.img} alt="foto" />

        <h3>{figure.title}</h3>
        <button type="button" className="detailsButton" onClick={() => setActiv((prev) => !prev)}>
          подробнее
        </button>
        {activ ? (
          <>
            <p>{figure.materials}</p>
            <p>{figure.height} см</p>
            <p>{figure.width} см</p>
            <h3>{figure.price} $</h3>
            <p>{figure.sell}</p>
          </>
        ) : (
          <>
            <button type="button" onClick={handleFavorite}>
              {like ? <RxStarFilled /> : <LiaStar />}
            </button>
            <div>
              <button type="button">покупаю!</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FigureItem;
