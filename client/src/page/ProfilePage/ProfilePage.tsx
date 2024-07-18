import React, {  useState } from 'react';

import { useAppSelector } from '../../app/store/store';
import './ProfilePage.css'
import ProfileBio from '../../entities/profile/ui/ProfileBio';
import ProfileMyFigure from '../../entities/profile/ui/ProfileMyFigure';
import ProfileMyAdress from '../../entities/profile/ui/ProfileMyAdress';
import ProfileUpdatName from '../../entities/profile/ui/ProfileUpdatName';
import ModalWindowFigureProf from '../../shared/ui/Modal/ModalFigureCreate';






function ProfilePage ({}): JSX.Element {
    const {user} = useAppSelector((state) => state.auth)

   const {figures} =useAppSelector((state) => state.figures)
   const {users} = useAppSelector((state) => state.users)

    const {profiles} = useAppSelector((state) => state.profiles)

      const isProfile = profiles.find(el => el.id === user?.id)

    const [isOpenBio, setIsOpenBio] = useState(true)
    const [isOpenMyFigure, setIsOpenMyFigure] = useState(false)
    const [isOpenMyAdress, setIsOpenMyAdress] = useState(false)
    const [active, setActive] = useState<boolean>(false);
    
    
return (
<div className='ProfilePage'>
    <div className="wrapper-prof-bio">
        
            <div className="NameImg">
                    <div className='div-map'>
                    <div className='pictha'>
                    <img src={isProfile?.img} alt="" />
                    </div>
                    <div className='div-map-name'>
                         <div className='div-p-name'>
                            <p>Имя: {isProfile?.name}</p>
                            <p>Фамилия: {isProfile?.lastName}</p>
                        </div>
                    </div>
                    <div className='gu'>
                    <ModalWindowFigureProf active={active} setActive={setActive}>
                        <ProfileUpdatName isProfile={isProfile} setActive={setActive}/>
                    </ModalWindowFigureProf>
                    <button onClick={()=> setActive((prev) => !prev)}>изменить</button>
                    </div>
                    </div>
            </div>
       
        <div className="info-page-comtener">
            <div className="button-page">
                <button onClick={() => {setIsOpenMyFigure(false); setIsOpenMyAdress(false);setIsOpenBio(true)}}>Биография</button>
                <button onClick={() => { setIsOpenBio(false); setIsOpenMyAdress(false);setIsOpenMyFigure(true)}}>Картины</button>
                <button onClick={() => { setIsOpenMyFigure(false);setIsOpenBio(false);setIsOpenMyAdress(true)}}>Как связаться</button>
            </div>
            <div className={isOpenBio === true && isOpenMyFigure === false && isOpenMyAdress === false ? 'divr' : 'gty'}>
            <ProfileBio isProfile={isProfile}/>
            </div>
            <div className={isOpenMyFigure === true && isOpenBio === false && isOpenMyAdress === false ? 'divr' : 'gty'}>
             <ProfileMyFigure isProfile={isProfile}/>
            </div>
            <div className={isOpenMyAdress === true && isOpenBio === false && isOpenMyFigure === false ? 'divr' : 'gty'}>
             <ProfileMyAdress isProfile={isProfile}/>
            </div>
        </div>
    </div>
 </div>
 );

}
export default ProfilePage
