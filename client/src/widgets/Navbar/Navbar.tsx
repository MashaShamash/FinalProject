import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { PiBasketThin } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { getLogoutThunk } from '../../entities/auth/authSlice';
import ModalWindow from '../../shared/ui/Modal/Modal';
import RegistrationPage from '../../page/AuthPage/RegistrationPage';
import AuthorizationPage from '../../page/AuthPage/AuthorizationPage';
import ModalWindowRego from '../../shared/ui/Modal/ModalRego';


function Navbar(): JSX.Element {

  const {user} = useAppSelector((state) => state.auth)
  const [active, setActive] = useState<boolean>(false);
  const [activeRego, setActiveRego] = useState<boolean>(false);
  
  const dispatch = useAppDispatch()


  const onHendleLogaut = ():void => {
    void dispatch(getLogoutThunk())
    setActive(false)
    setActiveRego(false)


  }
  return (
    <div className="Navbar">
      <ul>
        <li>
          <NavLink to="/categories">главная</NavLink>
        </li>
        <li>
          <NavLink to="/figures">картины</NavLink>
        </li>
        <li>
          <NavLink to="/basket">
            <PiBasketThin style={{ width: '30px' }} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/figures">купить</NavLink>
        </li>
        {user ? (
          <>
          <li>
            <NavLink to="*" onClick={onHendleLogaut}>выйти</NavLink>
          </li>
          <li>
          <NavLink to="/profile">личный кабинет</NavLink>
          </li>
          <li>
          <NavLink to="/like">избранное</NavLink>
        </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="#" onClick={() => setActiveRego(prev => !prev)}>регистрация</NavLink>
            </li>
            <>
              <ModalWindowRego activeRego={activeRego} setActiveRego={setActiveRego}>
                <RegistrationPage />
              </ModalWindowRego>
            </>
            <li>
              <NavLink to="_" onClick={() => setActive(prev => !prev)}>войти</NavLink>
            </li>
            <>
              <ModalWindow active={active} setActive={setActive}>
                <AuthorizationPage />
              </ModalWindow>
              </>
          </>
        )}
      </ul>
    </div>
  );
}
export default Navbar;
