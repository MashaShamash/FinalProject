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
import InputFilter from '../../entities/InputFilter/InputFilter';

function Navbar(): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  const [active, setActive] = useState<boolean>(false);
  const [activeRego, setActiveRego] = useState<boolean>(false);
  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const onHendleLogaut = (): void => {
    void dispatch(getLogoutThunk());
    navigate('/')
    setActive(false);
    setActiveRego(false);
  };

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
          <InputFilter />
        </li>
        <li>
          <NavLink to="/basket">
            <PiBasketThin style={{ width: '30px' }} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/magazin">купить</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <button onClick={onHendleLogaut}>выйти</button>
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
              <button onClick={() => setActiveRego((prev) => !prev)}>регистрация</button>
            </li>
            <>
              <ModalWindowRego activeRego={activeRego} setActiveRego={setActiveRego}>
                <RegistrationPage/>
              </ModalWindowRego>
            </>
            <li>
              <button onClick={() => setActive((prev) => !prev)}>войти</button>
            </li>
            <>
              <ModalWindow active={active} setActive={setActive}>
                <AuthorizationPage/>
              </ModalWindow>
            </>
          </>
        )}
      </ul>
    </div>
  );
}
export default Navbar;
