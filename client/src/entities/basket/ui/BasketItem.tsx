import React from 'react';
import { useSelector } from 'react-redux';
// import { Button, ButtonGroup } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, type RootState } from '../../../app/store/store';
import type { BasketLine } from '../types/basketTypes';
import { deleteBasketLine, updateBasketLine } from '../basketSlice';

type BasketItemProps = {
  basketLine: BasketLine;
};

function BasketItem({ basketLine }: BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const figures = useSelector((state: RootState) => state.figures.figures);
  const figure = figures.find((figure) => figure.id === basketLine.figureId);

  const handleIncreaseBasketLine = () => {
    void dispatch(updateBasketLine({ basketLine, action: 'increase' }));
  };
  const handleDecreaseBasketLine = () => {
    void dispatch(updateBasketLine({ basketLine, action: 'decrease' }));
  };
  const handleDeleteBasketLine = () => {
    void dispatch(deleteBasketLine(basketLine.id));
  };
  return (
    <div>
      {figure && (
        <div style={{display:"flex", margin:"20px"}}className="BasketItem">
          <img style={{width:"500px"}}src={figure.img} alt="book" />

          <div style={{ margin:"20px"}}>
            <h3>{figure.title}</h3>
            <p>{figure.materials}</p>
          </div>
          <div>
            <p>{figure.price} ₽</p>
            {/* <div> */}

            {/* <button type='button'
                    sx={{ p: 0, color: '#547050', borderColor: '#121711' }}
                    onClick={handleDecreaseBasketLine}
                  >
                    
                  </Button>
                  <Button sx={{ p: 0, color: '#547050', borderColor: '#121711' }}>
                    {basketLine.count}
                  </Button>
                  <Button
                    sx={{ p: 0, color: '#547050', borderColor: '#121711' }}
                    onClick={handleIncreaseBasketLine}
                  >
                    <AddIcon />
                  </Button>
               
                <Button sx={{ p: 0, color: '#547050' }} onClick={handleDeleteBasketLine}>
                  <ClearIcon sx={{ p: 0, width: '15px', height: '15px' }} />
                </Button>
              </div> */}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default BasketItem;
