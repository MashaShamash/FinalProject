import React from 'react';
import { useSelector } from 'react-redux';
import FigureItem from '../../entities/figures/ui/FigureItem';
import type { RootState } from '../../app/store/store';

function FavoritePage(): JSX.Element {
  const likes = useSelector((state: RootState) => state.like.like);

  return (
    <div>
      <h2>Ваши хотелки</h2>
      <div className="figuresList">
      {likes && likes.map((like)=><FigureItem figure={like.Figure}/>)}
      </div>
    </div>
  );
}

export default FavoritePage;
