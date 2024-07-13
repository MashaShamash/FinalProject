import React from 'react';
import FigureItem from '../../entities/figures/ui/FigureItem';

type LikePageProps = {
  likedFigures: { figureId: string }[];
  setLikes: (likes: { figureId: string }[]) => void;
};

function LikePage({ likedFigures, setLikes }: LikePageProps): JSX.Element {
//   const handleRemoveFromLike = (figureId: string) => {
//     setLikes((prev) => prev.filter((like: { figureId: string; }) => like.figureId !== figureId));
//   };

  return (
    <div>
      <h2>Ваши хотелки</h2>
      <div className="figuresList">
        
        {/* {likedFigures.map((like) => (
          <FigureItem
            key={like.figureId}
            figure={figures.find((f) => f.id === like.figureId)}
            like={likedFigures}
            setLikes={setLikes}
          />
        ))} */}
      </div>
    </div>
  );
}

export default LikePage;
