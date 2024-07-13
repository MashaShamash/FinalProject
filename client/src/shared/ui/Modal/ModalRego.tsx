import React from 'react';
import './ModalRego.css';

function ModalWindowRego({
  activeRego,
  setActiveRego,
  children,
}: {
  activeRego: boolean;
  setActiveRego: (value: boolean) => void;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={activeRego ? 'modal active' : 'modal'} onClick={() => setActiveRego(false)}>
      <div
        className={activeRego ? 'modal__content active' : 'modal__conten'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalWindowRego;