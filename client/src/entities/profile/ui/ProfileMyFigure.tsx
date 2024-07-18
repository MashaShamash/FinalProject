import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { Profile } from '../types/profileTypes';
import ModalWindowFigureProf from '../../../shared/ui/Modal/ModalFigureCreate';
import ProfileUpdateFigure from './ProfileUpdateFigure';
import ProfileCreateFigure from './ProfileCreateFigure';
import { removeFigureThunk } from '../../figures/figuresSlice';
import { Figure } from '../../figures/types/figureTypes';
import './ProfileMyFigure.css'
import ModalWindowFigureUpdate from '../../../shared/ui/Modal/ModalUpdateFigure';
import ModalWindowFigureDelete from '../../../shared/ui/Modal/ModalDeleteFigure';
import { useNavigate } from 'react-router-dom';

type ProfileMyFigureProps={
    isProfile: Profile
    
}
const ProfileMyFigure = ({isProfile}: ProfileMyFigureProps): JSX.Element =>{
    const {user} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {figures} = useAppSelector((state) => state.figures)
    const [active, setActive] = useState<boolean>(false);
    const [activeUpdate, setActiveUpdate] = useState<boolean>(false);
    const [activeDelete,setActiveDelete] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(true);

        const onHeandleDeleteFigure = (figure:Figure) => {
           void dispatch(removeFigureThunk(figure.id))
        }
   
    
return (
<div className=' ProfileMyFigure'>
        <ModalWindowFigureProf active={active} setActive={setActive}>
            <ProfileCreateFigure isProfile={isProfile}/>
        </ModalWindowFigureProf>
        <div className='button-open'>
        <button onClick={() => setActive((prev) => !prev)}>Добавить исскуства</button>
        </div>
        <div className='div-h1'>
        <h2>Мои произведения искусства</h2>
        </div>
        <div className='div-map-figure-main'>
        {figures.map(figure => (
            figure.userId === isProfile?.userId ? (
                <>
            <div className='div-map-figure'>
                <img src={figure.img} alt="" />
                <h2>{figure.title}</h2>
                <button
          style={{ backgroundColor: 'transparent', border: 'none' }}
          type="button"
          className="detailsButton"
         onClick={() => navigate(`/figures/${figure.id}`) }
        >
          подробнее
        </button>
            
        <ModalWindowFigureUpdate setActiveUpdate={setActiveUpdate} activeUpdate={activeUpdate}>
            <ProfileUpdateFigure figure={figure} isProfile={isProfile}/>
        </ModalWindowFigureUpdate>
        <ModalWindowFigureDelete setActiveDelete={setActiveDelete} activeDelete={activeDelete}>
            <div className='delr'>
            <h1 className='pui'>Вы действительно хотите Удалить?</h1>
            <button onClick={() => {onHeandleDeleteFigure(figure); setActiveDelete((prev) => !prev)}}>Удалить</button>
            </div>
        </ModalWindowFigureDelete>
            <div className='two-button'>
            <button className='ui' onClick={()=> setActiveUpdate((prev) => !prev)}>Изменить</button>
            <button className='uy' onClick={() => setActiveDelete((prev) => !prev)}>Удалить</button>
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
export default ProfileMyFigure
