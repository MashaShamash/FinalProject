import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import './ProfilePage.css'
import { getUpdateProfileThunk } from '../../entities/profile/profileSlice';
import ProfileBio from '../../entities/profile/ui/ProfileBio';
import ProfileMyFigure from '../../entities/profile/ui/ProfileMyFigure';
import ProfileMyAdress from '../../entities/profile/ui/ProfileMyAdress';

type ProfilePageProps={
}

function ProfilePage ({}: ProfilePageProps): JSX.Element {
    const {user} = useAppSelector((state) => state.auth)
    const {profiles} = useAppSelector((state) => state.profiles)
    const dispatch = useAppDispatch()
    const isProfile = profiles.filter(el => el.id === user?.id)
    const profile = isProfile[0]
    const [isOpenBio, setIsOpenBio] = useState(true)
    const [isOpenMyFigure, setIsOpenMyFigure] = useState(false)
    const [isOpenMyAdress, setIsOpenMyAdress] = useState(false)
    
    

    const onHeandleUpate = (e:React.FormEvent<HTMLElement>): void => {
        e.preventDefault()
        void dispatch(getUpdateProfileThunk({id:isProfile[0].id, body: {name, lastName, conDan, pseudonym, biography: profilBio}}))
    }
    
    
return (
<div className='ProfilePage'>
    <div className="wrapper">
        <div className="conteiner">
            <div className="NameImg">
                    <div className='div-map'>
                    <img src="https://img.freepik.com/premium-vector/cool-man-profile-photo-icon-profile-icon-male-head-face-flat-design-vector-illustration_750364-393.jpg" alt="" />
                    <div className='div-map-name'>
                    <p>Имя: {profile.name}</p>
                    <p>Фамиля: {profile.lastName}</p>
                    <p>Контакт: {profile.conDan}</p>
                    </div>
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
            <ProfileBio profile={profile}/>
            </div>
            <div className={isOpenMyFigure === true && isOpenBio === false && isOpenMyAdress === false ? 'divr' : 'gty'}>
             <ProfileMyFigure profile={profile}/>
            </div>
            <div className={isOpenMyAdress === true && isOpenBio === false && isOpenMyFigure === false ? 'divr' : 'gty'}>
             <ProfileMyAdress />
            </div>
        </div>
    </div>
 </div>
 );

}
export default ProfilePage
