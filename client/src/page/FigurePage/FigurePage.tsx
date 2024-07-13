import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store/store';
import FigureItem from '../../entities/figures/ui/FigureItem';
import './FigureDiv.css'

function FigurePage(): JSX.Element {
  const { figures } = useSelector((state: RootState) => state.figures);
  // const [active, setActive] = useState(false)
  console.log(11111, figures);

  return (
    <div className='figureDiv'>
      {/* <button onClick={()=>setActive((prev)=>!prev)}>
           добавить фильм
          </button>
          {active &&
            <FormAddCategory/>
          } */}
      {figures &&
        figures.map((figure) => <FigureItem figure={figure} key={figure.id} />)}
    </div>
  );
}

export default FigurePage;