import React from 'react';
import { useSelector } from 'react-redux';
import FigureItem from '../../entities/figures/ui/FigureItem';
import type { RootState } from '../../app/store/store';

function LikePage(): JSX.Element {
  const likes = useSelector((state: RootState) => state.like.like);
  console.log(likes);

  return (
    <div>
      <h2>Ваши хотелки</h2>
      <div className="figuresList">
        {likes && likes.map((like) => <FigureItem key={like.id} figure={like.Figure} />)}
      </div>
    </div>
  );
}

export default LikePage;
