import React from 'react';
import './Modal.css';

function ModalWindow({
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
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;