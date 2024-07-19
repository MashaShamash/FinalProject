import React, { useState } from 'react';
import type { Figure } from '../../../entities/figures/types/figureTypes';
import { useAppSelector } from '../../../app/store/store';
import ProfileUserBio from '../../../entities/profile/profileUsers/ui/ProfileUserBio';
import ProfileUsersFigure from '../../../entities/profile/profileUsers/ui/ProfileUsersFigure';
import ProfileUserAdress from '../../../entities/profile/profileUsers/ui/ProfileMyAdress';

type ProfilePageProps = {
  figure: Figure;
};

function ProfileUsersPage({ figure }: ProfilePageProps): JSX.Element {
  const { users } = useAppSelector((state) => state.users);

  const { profiles } = useAppSelector((state) => state.profiles);

  const userse = users.find((el) => el.id === +figure.id);
  const isProfile = profiles.find((el) => el.id === userse?.id);

  const [isOpenBio, setIsOpenBio] = useState(true);
  const [isOpenMyFigure, setIsOpenMyFigure] = useState(false);
  const [isOpenMyAdress, setIsOpenMyAdress] = useState(false);

  return (
    <div className="ProfilePage">
      <div className="wrapper-prof-bio">
        <div className="NameImg">
          <div className="div-map">
            <div className="pictha">
              <img src={isProfile?.img} alt="" />
            </div>
            <div className="div-map-name">
              <div className="div-p-name">
                <p>Имя: {isProfile?.name}</p>
                <p>Фамилия: {isProfile?.lastName}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-page-comtener">
          <div className="button-page">
            <button
              type="button"
              onClick={() => {
                setIsOpenMyFigure(false);
                setIsOpenMyAdress(false);
                setIsOpenBio(true);
              }}
            >
              Биография
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpenBio(false);
                setIsOpenMyAdress(false);
                setIsOpenMyFigure(true);
              }}
            >
              Картины
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpenMyFigure(false);
                setIsOpenBio(false);
                setIsOpenMyAdress(true);
              }}
            >
              Как связаться
            </button>
          </div>
          <div
            className={
              isOpenBio === true && isOpenMyFigure === false && isOpenMyAdress === false
                ? 'divr'
                : 'gty'
            }
          >
            {isProfile && <ProfileUserBio isProfile={isProfile} />}
          </div>
          <div
            className={
              isOpenMyFigure === true && isOpenBio === false && isOpenMyAdress === false
                ? 'divr'
                : 'gty'
            }
          >
            {isProfile && <ProfileUsersFigure isProfile={isProfile} figure={figure} />}
          </div>
          <div
            className={
              isOpenMyAdress === true && isOpenBio === false && isOpenMyFigure === false
                ? 'divr'
                : 'gty'
            }
          >
            {isProfile && <ProfileUserAdress isProfile={isProfile} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileUsersPage;
