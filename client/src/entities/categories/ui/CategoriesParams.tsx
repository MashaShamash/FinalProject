import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoriesParams.css';
import { useAppSelector } from '../../../app/store/store';
import type { Figure } from '../../figures/types/figureTypes';
import type { Category } from '../types/categoryTypes';

function CategoriesParams(): JSX.Element {
  const { catId } = useParams<{ catId: string }>();
  const navigate = useNavigate()
  const { categories } = useAppSelector((state) => state.categories);
  const { figures } = useAppSelector((state) => state.figures);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Figure[]>([]);
  const [filteredFigures, setFilteredFigures] = useState<Figure[]>([]);
  const [active, setActive] = useState(false);
  let nameCategor: Category | undefined;

  if (catId) {
    nameCategor = categories.find((el) => el.id === +catId);
  }

  useEffect(() => {
    if (catId) {
      const filtered = figures.filter((el) => el.categoryId === +catId);
      setFilteredFigures(filtered);
      setItems(filtered.slice(0, 20));
    }
  }, [catId, figures]);

  const fetchMoreData = (): void => {
    if (items.length >= filteredFigures.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(filteredFigures.slice(items.length, items.length + 20)));
    }, 1500);
  };
  return (
    <div className=" CategoriesParams">
      <h1>Категория: {nameCategor?.title}</h1>
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
        endMessage={<p></p>}
      >
        {items &&
          items.map((el) => (
            <div key={el.id} className="figureCard">
              <img src={el.img} alt={el.title} />
              <h3>{el.title}</h3>
              <p>{el.materials}</p>
              <p>{el.height}</p>
              <h3>{el.price}</h3>
              <p>{el.width}</p>
              <p>{el.sell}</p>
              <button type='button' onClick={()=> navigate(`/figures/${el.id}`)}>Подробнее</button>
            </div>
          ))}
      </InfiniteScroll>
    </div>
  );
}
export default CategoriesParams;
