import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';

import './FiguresParams.css';
// import ProfilePage from '../../../page/ProfilePage/ProfilePage';
import ProfileUsersPage from '../../../page/ProfilePage/ProfileUsers/ProfileUsersPage';
import { addToBasket } from '../../basket/basketSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '@reduxjs/toolkit/query';
// import ModalWindow from '../../../shared/ui/Modal/Modal';

function FiguresParams(): JSX.Element {
  const dispatch = useAppDispatch();
  const { figId } = useParams<{ figId: string }>();
  const [openBasket, setOpenBasket] = useState(false);
  const { figures } = useAppSelector((state) => state.figures);
  // user
  const user = useSelector((state: RootState) => state.auth.user);
  const figure = figures.find((f) => f.id === +figId);
  const [active, setActive] = useState<boolean>(true);
  const navigate = useNavigate();

  if (!figure) {
    return <p>Figure not found</p>;
  }
  const handleAddToBasket = (): void => {
    void dispatch(addToBasket(figure.id));
    setOpenBasket(true);
  };

  return (
    <>
      <div />
      <div className="div-get-button">
        <button onClick={() => navigate(-1)}>К картинам</button>
        <button onClick={() => setActive((prev) => !prev)}>
          {active ? `Перейти в Профиль ${figure.name}` : 'Назад'}
        </button>
      </div>
      <div className="figureItem">
        {active ? (
          <>
            <img src={figure.img} alt="foto" />
            <div className="figureItemText">
              <h4 className="bold">Название картины: {figure.title}</h4>
              <p style={{ fontSize: '22px' }}>Имя художника: {figure.name}</p>
              <p style={{ fontSize: '22px' }}>Фамилия художника: {figure.lastName}</p>
              <p>Псевдоним художника: {figure.pseudonym}</p>
              <p>Биография художника: {figure.biography}</p>
              <p>Дата публикации работы: {figure.date} год</p>
              <p>Материал: {figure.materials}</p>
              <p>Высота холста: {figure.height} см</p>
              <p>Ширина холста: {figure.width} см</p>
              <p className="bold" style={{ fontSize: '22px' }}>
                Стоимость: {figure.price} руб.
              </p>
              {user && user.id !== figure.userId && (
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '10px',
                    border: 'solid 1px',
                    borderRadius: '10px',
                    fontSize: '18px',
                    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  className="btn"
                  type="button"
                  onClick={() => handleAddToBasket()}
                >
                  добавить в корзину
                </button>
              )}
            </div>
          </>
        ) : (
          <div>
            <ProfileUsersPage figure={figure} />
          </div>
          
        )}
      </div>
    </>
  );
}
export default FiguresParams;

// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import ProfileUsersPage from '../../../page/ProfilePage/ProfileUsers/ProfileUsersPage'; // Предполагаю, что это путь к компоненту ProfileUsersPage
// import type { RootState } from '../../app/store/store'; // Путь к вашему типу RootState

// function FiguresParams({ figure }) {
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth.user); // Получаем информацию о текущем пользователе
//   const [active, setActive] = React.useState(true);

//   const handleAddToBasket = () => {
//     if (user) {
//       // Добавляем в корзину
//     } else {
//       navigate('/login'); // Перенаправляем на страницу логина, если пользователь не авторизован
//     }
//   };

//   return (
//     <>
//       <div></div>
//       <div className="div-get-button">
//         <button onClick={() => navigate(-1)}>К картинам</button>
//         <button onClick={() => setActive((prev) => !prev)}>
//           {active ? `Перейти в Профиль ${figure.name}` : 'Назад'}
//         </button>
//       </div>
//       <div className="figureItem">
//         {active ? (
//           <>
//             <img src={figure.img} alt="foto" />
//             <div className="figureItemText">
//               <h4 className="bold">Название картины: {figure.title}</h4>
//               <p style={{ fontSize: '22px' }}>Имя художника: {figure.name}</p>
//               <p style={{ fontSize: '22px' }}>Фамилия художника: {figure.lastName}</p>
//               <p>Псевдоним художника: {figure.pseudonym}</p>
//               <p>Биография художника: {figure.biography}</p>
//               <p>Дата публикации работы: {figure.date} год</p>
//               <p>Материал: {figure.materials}</p>
//               <p>Высота холста: {figure.height} см</p>
//               <p>Ширина холста: {figure.width} см</p>
//               <p className="bold" style={{ fontSize: '22px' }}>
//                 Стоимость: {figure.price} руб.
//               </p>
//               {user ? (
//                 <button
//                   style={{
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     padding: '10px',
//                     border: 'solid 1px',
//                     borderRadius: '10px',
//                     fontSize: '18px',
//                     boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2)'
//                   }}
//                   className="btn"
//                   type="button"
//                   onClick={handleAddToBasket}
//                 >
//                   добавить в корзину
//                 </button>
//               ) : (
//                 <p>Пожалуйста, войдите, чтобы добавить в корзину</p>
//               )}
//             </div>
//           </>
//         ) : (
//           <div>
//             <ProfileUsersPage figure={figure} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default FiguresParams;
