import React from 'react';
import { NavLink } from 'react-router-dom';

// type NavbarProps={
// }
function Navbar(): JSX.Element {
  let user;
  return (
    <div className="Navbar">
      <ul>
        <li>
          <NavLink to="/" />
        </li>
        {user ? (
          <li>
            <NavLink to="/Выйти" />
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/registration" />
            </li>
            <li>
              <NavLink to="/autorization" />
            </li>
          </>
        )}
        <li>
          <NavLink to="/figures" />
        </li>
        <li>
          <NavLink to="/profile" />
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
