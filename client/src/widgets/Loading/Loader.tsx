import React from 'react';

import './Loader.css';

export const Loader = (): JSX.Element => (
  <div className='lds-ellipsis'>
    <div />
    <div />
    <div />
    <div />
  </div>
);