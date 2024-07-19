import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FigureItem from '../../entities/figures/ui/FigureItem';
import type { RootState } from '../../app/store/store';
import { getAllLikeThunk } from '../../entities/like/likeSlice';
import './Favorite.css';
import likeFoto from '../../../public/like.jpg';

function LikePage(): JSX.Element {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.like.like);
  console.log(likes);

  useEffect(() => {
    void dispatch(getAllLikeThunk());
  }, [dispatch]);

  return (
    <div className="contanerFavorite">
      <div>
        {likes.length !== 0 ? (
          <div>
            <h2>Ваши хотелки</h2>
            <div style={{ width: '100vw', display: 'flex' }}>
              {likes.map((like) => (
                <FigureItem key={like.id} figure={like.Figure} />
              ))}
            </div>
          </div>
        ) : (
          <div className="notLike">
            <h1>Избранные не избранны</h1>
            <Link to="/categories">Перейти к просмотру коллекций</Link>
            <img style={{}} src={likeFoto} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default LikePage;
