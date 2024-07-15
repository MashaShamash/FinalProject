import React, { useState } from 'react';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import './figure.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { Figure } from '../types/figureTypes';
import type { RootState } from '../../../app/store/store';
import { useAppDispatch } from '../../../app/store/store';
import { createLikeThunk } from '../../like/likeSlice';

type FigureItemProps = {
  figure: Figure;
};

function FigureItem({ figure }: FigureItemProps): JSX.Element {
  const [activ, setActiv] = useState(false);
  const navigte = useNavigate();
  let like;
  const likes = useSelector((state: RootState) => state.like.like);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleFavorite = (): void => {
    void dispatch(createLikeThunk({ figureId: figure.id }));
  };
  if (user) {
    like = likes.find((el) => el.userId === user.id);
  }

  return (
    <div className="figureCard">
      <img src={figure.img} alt="" />

      <h3>{figure.title}</h3>
      <button type="button" onClick={() => navigte(`/figures/${figure.id}`)}>
        подробнее
      </button>

      <button type="button" onClick={handleFavorite}>
        {like ? <FcLike /> : <FcLikePlaceholder />}
      </button>
      <div>
        <button type="button">покупаю!</button>
      </div>
      {/* )
      } */}
    </div>
  );
}

export default FigureItem;
