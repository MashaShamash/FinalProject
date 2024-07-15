import React, { useState } from 'react';
import { Profile } from '../types/profileTypes';
import './ProfileBio.css'
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { getUpdateProfileThunk } from '../profileSlice';
import { useParams } from 'react-router-dom';

type ProfileBioProps={
    profile: Profile
}
const ProfileBio = ({profile}: ProfileBioProps): JSX.Element =>{
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.auth)
    const [profilBio, setProfilBio] = useState(profile.biography)
    const [profilPseudonym, setProfilPseudonym] = useState(profile.pseudonym)
    const [isOpenBio, setIsOpenBio] = useState(true)
    const [isOpenPsev, setIsOpenPsev] = useState(true)

    const onHeandleUpate = (e:React.FormEvent<HTMLElement>): void => {
        e.preventDefault()
        void dispatch(getUpdateProfileThunk({id:profile.id, body: {name: profile.name, lastName: profile.lastName, conDan: profile.conDan, pseudonym: profilPseudonym, biography: profilBio}}))
        setIsOpenBio(true)
        setIsOpenPsev(true)
    }
    
    

return (
<div className=' ProfileBio'>
    <div className="div-biograf">
                    <div className='div-map-bio'>
                        <div className='div-map-bio_but'>
                        <h1>Биография</h1>
                        {isOpenBio && user?.id === profile.userId ? 
                        (<button className='psevdanim-btn' onClick={()=> setIsOpenBio((prev) => !prev)}>Изменить</button>
                        ) : (
                        null)}
                        </div>
                        {isOpenBio ? 
                        (
                            <div className='profile-p-div'>
                                <p className='profile-p'>{profile.biography}</p>
                            </div>
                        ) : (
                        <form className='formClass' action="" onSubmit={onHeandleUpate}>
                            <span className='span-form'>Колличество символов: {profilBio.length} /500</span>
                            <textarea
                            value={profilBio}
                            className='textarea-bio'
                            placeholder={profilBio}
                            onChange={(e) => setProfilBio(e.target.value)}
                            rows={4}// Устанавливаем высоту textarea на 4 строки
                            // cols="50" // Ширина textarea в символах
                            maxLength={500}
                            ></textarea>
                            <button type='submit' className='psevdanim-btn-ty'>Изменить</button>
                        </form>
                        
                     )}
                    </div>
                    <div className="div-map-bio">
                        <div className='div-map-bio_but'>
                        <h1>Псевдоним</h1>
                        {isOpenPsev && user?.id === profile.userId ? 
                        (<button className='psevdanim-btn' onClick={()=> setIsOpenPsev((prev) => !prev)}>Изменить</button>
                        ) : (
                        null)}
                        </div>
                        {isOpenPsev ? 
                        (
                            <div className='profile-p-div'>
                                <p className='profile-p'>{profile.pseudonym}</p>
                            </div>
                        ) : (
                        <form className='formClass' action="" onSubmit={onHeandleUpate}>
                            <span className='span-form'>Колличество символов: {profilPseudonym.length} /100</span>
                            <textarea
                            value={profilPseudonym}
                            className='textarea-bio'
                            placeholder={profilPseudonym}
                            onChange={(e) => setProfilPseudonym(e.target.value)}
                            rows={4} // Устанавливаем высоту textarea на 4 строки
                            // cols="50" // Ширина textarea в символах
                            maxLength={100}
                            ></textarea>
                            <button type='submit' className='psevdanim-btn-ty'>Изменить</button>
                        </form>
                        )}
                    </div>
    </div>
 </div>
 );

}

export default ProfileBio;
