import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar(): JSX.Element {
  let user;
  return (
    <div className="Navbar">
      <ul>
        <li>
          <NavLink to="/">главная</NavLink>
        </li>
        <li>
          <NavLink to="/figures">картины</NavLink>
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
        {user ? (
          <li>
            <NavLink to="/profile">личный кабинет</NavLink>
          </li>
        ) : (
          null
        )}
      </ul>
    </div>
  );
}
export default Navbar;
