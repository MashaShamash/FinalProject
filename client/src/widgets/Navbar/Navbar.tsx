import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { PiBasketThin } from 'react-icons/pi';

function Navbar(): JSX.Element {
  let user;
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
          <li>
            <NavLink to="/logout">выйти</NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/registration">регистрация</NavLink>
            </li>
            <li>
              <NavLink to="/autorization">войти</NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/like">избранное</NavLink>
        </li>

        {user ? (
          <li>
            <NavLink to="/profile">личный кабинет</NavLink>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
export default Navbar;
