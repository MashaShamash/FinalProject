import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { type RootState } from '../../app/store/store';
import FigureItem from '../../entities/figures/ui/FigureItem';
import './FigureDiv.css';

function FigurePage(): JSX.Element {
  const { figures } = useSelector((state: RootState) => state.figures);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(figures.slice(0, 20));

  const fetchMoreData = (): void => {
    if (items.length >= figures.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(figures.slice(items.length, items.length + 20)));
    }, 1500);
  };

  return (
    <div className='gallery' >
      <InfiniteScroll
        style={{
          height: 'auto',
          overflow: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4></h4>}
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
