import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store/store';
import FigureItem from '../../entities/figures/ui/FigureItem';

import InfiniteScroll from 'react-infinite-scroll-component';

import LikePage from '../LikePage/FavoritePage';

import './FigureDiv.css';

function FigurePage(): JSX.Element {
  const { figures } = useSelector((state: RootState) => state.figures);
  // const [likedFigures, setLikedFigures] = useState<{ figureId: string }[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(figures.slice(0, 20));

  const fetchMoreData = () => {
    if (items.length >= figures.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(figures.slice(items.length, items.length + 20)));
    }, 1500);
  };

  return (
    <div>
      <InfiniteScroll style={{'height': 'auto', 'overflow': 'auto', 'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center'}}
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more figures to display</p>}
      >
        {items.map((figure) => (
          <FigureItem
            figure={figure}
            // like={likedFigures}
            // setLikes={setLikedFigures}
            key={figure.id}
          />
        ))}
      </InfiniteScroll>
      {/* <LikePage likedFigures={likedFigures} setLikes={setLikedFigures} /> */}
    </div>
  );
}

export default FigurePage;
