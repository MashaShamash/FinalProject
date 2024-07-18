import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FigureItem from '../../entities/figures/ui/FigureItem';
import type { RootState } from '../../app/store/store';
import { getAllLikeThunk } from '../../entities/like/likeSlice';
import './Favorite.css';

function LikePage(): JSX.Element {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.like.like);

  useEffect(() => {
    dispatch(getAllLikeThunk());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h2>Ваши хотелки</h2>
      </div>
      <div style={{ width: '100vw', display: 'flex' }}>
        {likes && likes.map((like) => <FigureItem key={like.id} figure={like.Figure} />)}
      </div>
    </div>
  );
}

export default LikePage;