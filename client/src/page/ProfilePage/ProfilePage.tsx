import React, { useState } from 'react';
import { useAppSelector } from '../../app/store/store';
import './ProfilePage.css';
import ProfileBio from '../../entities/profile/ui/ProfileBio';
import ProfileMyFigure from '../../entities/profile/ui/ProfileMyFigure';
import ProfileMyAdress from '../../entities/profile/ui/ProfileMyAdress';
import ProfileUpdatName from '../../entities/profile/ui/ProfileUpdatName';
import ModalWindowFigureProf from '../../shared/ui/Modal/ModalFigureCreate';

function ProfilePage(): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  const { profiles } = useAppSelector((state) => state.profiles);

  const isProfile = profiles.find((el) => el.id === user?.id);

  const [isOpenBio, setIsOpenBio] = useState(true);
  const [isOpenMyFigure, setIsOpenMyFigure] = useState(false);
  const [isOpenMyAdress, setIsOpenMyAdress] = useState(false);
  const [active, setActive] = useState<boolean>(false);

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
            <div className="gu">
              <ModalWindowFigureProf active={active} setActive={setActive}>
                {isProfile && <ProfileUpdatName isProfile={isProfile} setActive={setActive} />}
              </ModalWindowFigureProf>
              <button type="button" onClick={() => setActive((prev) => !prev)}>
                изменить
              </button>
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
            {isProfile && <ProfileBio isProfile={isProfile} />}
          </div>
          <div
            className={
              isOpenMyFigure === true && isOpenBio === false && isOpenMyAdress === false
                ? 'divr'
                : 'gty'
            }
          >
          { isProfile && <ProfileMyFigure isProfile={isProfile} />}
          </div>
          <div
            className={
              isOpenMyAdress === true && isOpenBio === false && isOpenMyFigure === false
                ? 'divr'
                : 'gty'
            }
          >
           {isProfile && <ProfileMyAdress isProfile={isProfile} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
