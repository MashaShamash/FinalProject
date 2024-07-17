import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { Figure } from '../types/figureTypes';
import './FiguresParams.css';
import ProfilePage from '../../../page/ProfilePage/ProfilePage';
import ProfileUsersPage from '../../../page/ProfilePage/ProfileUsers/ProfileUsersPage';
import ModalWindow from '../../../shared/ui/Modal/Modal';



function FiguresParams(): JSX.Element {
  const { figId } = useParams<{ figId: string }>();


  const { figures } = useAppSelector((state) => state.figures);
  const figure = figures.find((f) => f.id === +figId);
  const [active, setActive] = useState<boolean>(true);
  const navigate = useNavigate()

  if (!figure) {
    return <p>Figure not found</p>;
  }

  return (
    <>
    <div>
      
    </div>
    <div className='div-get-button'>
      <button onClick={() => navigate(-1)}>К картинам</button>
    <button  onClick={()=>setActive((prev) => !prev)}>{active ? `Перейти в Профиль ${figure.name}`: 'Назад' }</button>
  </div>
   <div className="figureItem">
        {active ? (
          <>
        <img src={figure.img} alt='foto' />
        <div className="figureItemText">
        <p className='bold'>Название картины: {figure.title}</p>
        <p>Имя художника: {figure.name}</p>
        <p>Фамилия художника: {figure.lastName}</p>
        <p>Псевдоним художника: {figure.pseudonym}</p>
        <p>Биография художника: {figure.biography}</p>
        <p>Дата публикации работы: {figure.date} год</p>
        <p>Материал: {figure.materials}</p>
        <p>Высота холста: {figure.height} см</p>
        <p>Ширина холста: {figure.width} см</p>
        <p className='bold'>Стоимость: {figure.price} руб.</p>
        </div>
        </>
        ) : (
          <div> 
          <ProfileUsersPage figure={figure}/>
        </div>
        )}
      </div>
      </>
  );

}
export default FiguresParams
