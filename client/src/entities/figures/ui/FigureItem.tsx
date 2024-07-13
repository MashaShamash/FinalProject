import React, { useState } from 'react';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import './figure.css';
import type { Figure } from '../types/figureTypes';

type FigureItemProps = {
  figure: Figure;
};

function FigureItem({ figure }: FigureItemProps): JSX.Element {
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleFavorite = () => {
    if (favorites.includes(figure.id)) {
      setFavorites(favorites.filter((id) => id !== figure.id));
    } else {
      setFavorites([...favorites, figure.id]);
    }
  };

  return (
    <div className="figureCard">
      <img src={figure.img} alt="" />
      <h3>{figure.title}</h3>
      <p>{figure.materials}</p>
      <p>{figure.height}</p>
      <h3>{figure.price}</h3>
      <p>{figure.width}</p>
      <p>{figure.sell}</p>
      <button type="button" onClick={handleFavorite}>
        {favorites.includes(figure.id) ? <FcLike /> : <FcLikePlaceholder />}
      </button>
      <div>
        <button>покупаю!</button>
      </div>
    </div>
  );
}

export default FigureItem;