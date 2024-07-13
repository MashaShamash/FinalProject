import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store/store';
import FigureItem from '../../entities/figures/ui/FigureItem';
import LikePage from '../LikePage/FavoritePage';
import './FigureDiv.css';

function FigurePage(): JSX.Element {
  const { figures } = useSelector((state: RootState) => state.figures);
  // const [likedFigures, setLikedFigures] = useState<{ figureId: string }[]>([]);

  return (
    <div className="figureDiv">
      {figures &&
        figures.map((figure) => (
          <FigureItem
            figure={figure}
            // like={likedFigures}
            // setLikes={setLikedFigures}
            key={figure.id}
          />
        ))}
      {/* <LikePage likedFigures={likedFigures} setLikes={setLikedFigures} /> */}
    </div>
  );
}

export default FigurePage;
