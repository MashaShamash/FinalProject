import React, { useState } from 'react';

import { Profile } from '../../../profile/types/profileTypes';
import { RootState, useAppDispatch, useAppSelector } from '../../../../app/store/store';
import { useNavigate } from 'react-router-dom';
import { Figure } from '../../../figures/types/figureTypes';
import { RxStarFilled } from 'react-icons/rx';
import { LiaStar } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { createLikeThunk } from '../../../like/likeSlice';

type ProfileMyFigureProps={
    isProfile: Profile
    figure: Figure
}
const ProfileUsersFigure = ({isProfile, figure}: ProfileMyFigureProps): JSX.Element =>{
    const {figures} = useAppSelector((state) => state.figures)
    const {user} = useAppSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [activ, setActiv] = useState(false);

  let like;
  const likes = useSelector((state: RootState) => state.like.like);

  const handleFavorite = (): void => {
    void dispatch(createLikeThunk({ figureId: figure.id }));
  };
  if (likes && figure) {
    like = likes.find((lik) => lik.Figure.id === figure.id);
  }
return (
<div className=' ProfileMyFigure'>
        <div className='button-open'>
        </div>
        <div className='div-h1'>
        <h2>Мои произведения искусства</h2>
        </div>
        <div className='div-map-figure-main'>
        {figures.map(figur => (
            figur.userId === isProfile?.userId ? (
                <>
            <div className='div-map-figure' key={figur.id}>
                <img src={figur.img} alt="" />
                <h2>{figur.title}</h2>
                <div className='get-like'>
                {figure.id !== figur.id && <button
          style={{ backgroundColor: 'transparent', border: 'none',  boxShadow: '4px 4px 8px rgb(196, 216, 194)'  }}
          type="button"
          className="detailsButton"
         onClick={() => navigate(`/figures/${figur.id}`)}
        >
          подробнее
        </button>}
        {user && (
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '26px',
                  padding: '0',
                  marginLeft: '70px',
                }}
                type="buttonLike"
                onClick={handleFavorite}
              >
                {like ? <RxStarFilled /> : <LiaStar />}
              </button>)}
              </div>
            </div>
        </>
        ) : (null)
        )
            
        )}
        </div>
 </div>
 );

}
export default ProfileUsersFigure
