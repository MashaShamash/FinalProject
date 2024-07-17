import React, {  useState } from 'react';
import { Figure } from '../../../entities/figures/types/figureTypes';
import { useAppSelector } from '../../../app/store/store';
import ProfileUserBio from '../../../entities/profile/profileUsers/ui/ProfileUserBio';
import ProfileUsersFigure from '../../../entities/profile/profileUsers/ui/ProfileUsersFigure';
import ProfileUserAdress from '../../../entities/profile/profileUsers/ui/ProfileMyAdress';



type ProfilePageProps={
    figure: Figure
}

function ProfileUsersPage ({figure}: ProfilePageProps): JSX.Element {
    const {user} = useAppSelector((state) => state.auth)

   const {figures} =useAppSelector((state) => state.figures)
   const {users} = useAppSelector((state) => state.users)

    const {profiles} = useAppSelector((state) => state.profiles)
    
    const userse = users.find(el => el.id === +figure.id)
    const isProfile = profiles.find(el => el.id === userse?.id)
    
           
        

     

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
                    </div>
            </div>
       
        <div className="info-page-comtener">
            <div className="button-page">
                <button onClick={() => {setIsOpenMyFigure(false); setIsOpenMyAdress(false);setIsOpenBio(true)}}>Биография</button>
                <button onClick={() => { setIsOpenBio(false); setIsOpenMyAdress(false);setIsOpenMyFigure(true)}}>Картины</button>
                <button onClick={() => { setIsOpenMyFigure(false);setIsOpenBio(false);setIsOpenMyAdress(true)}}>Как связаться</button>
            </div>
            <div className={isOpenBio === true && isOpenMyFigure === false && isOpenMyAdress === false ? 'divr' : 'gty'}>
            <ProfileUserBio isProfile={isProfile}/>
            </div>
            <div className={isOpenMyFigure === true && isOpenBio === false && isOpenMyAdress === false ? 'divr' : 'gty'}>
             <ProfileUsersFigure isProfile={isProfile} figure={figure}/>
            </div>
            <div className={isOpenMyAdress === true && isOpenBio === false && isOpenMyFigure === false ? 'divr' : 'gty'}>
             <ProfileUserAdress isProfile={isProfile}/>
            </div>
        </div>
    </div>
 </div>
 );

}
export default ProfileUsersPage
