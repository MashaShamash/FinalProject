import React from 'react';
import { useSelector } from 'react-redux';
import FigureItem from '../../entities/figures/ui/FigureItem';
import type { RootState } from '../../app/store/store';
import './Favorite.css';

function LikePage(): JSX.Element {
  const likes = useSelector((state: RootState) => state.like.like);
  console.log(likes);

  return (
    <div className="contanerFavorite">
      <div>
        {' '}
        <h2>Ваши хотелки</h2>
      </div>
      <div>{likes && likes.map((like) => <FigureItem key={like.id} figure={like.Figure} />)}</div>
      {/* <div className="contenerFoter">
        <img src="../../../public/favorite.jpg" alt="" />
      </div> */}
    </div>
  );
}

export default LikePage;
