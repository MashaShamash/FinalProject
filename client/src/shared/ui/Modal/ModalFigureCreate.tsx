import React from 'react';
import './Modal.css';

function ModalWindowFigureProf({
    active,
    setActive,
    children,
  }: {
    active: boolean;
    setActive: (value: boolean) => void;
    children: React.ReactNode;
  }): JSX.Element {
    return (
      <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
        <div
          className={active ? 'modal__content active' : 'modal__conten'}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='div-button-ext'>
      <button className="botton-ext" onClick={() => setActive(false)}>
      <span className="menu-icon"><svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="15px" height="15px" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
<path d="M1067 11733 l-1067 -1068 2132 -2132 2133 -2133 -2133 -2133 -2132 -2132 1067 -1068 1068 -1067 2132 2132 2133 2133 2133 -2133 2132 -2132 1068 1067 1067 1068 -2132 2132 -2133 2133 2133 2133 2132 2132 -1067 1068 -1068 1067 -2132 -2132 -2133 -2133 -2133 2133 -2132 2132 -1068 -1067z"/>
</g>
</svg></span>
      </button>
      </div>
          {children}
        </div>
      </div>
    );
}

export default ModalWindowFigureProf;