import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../app/store/store';
import { useAppDispatch } from '../../app/store/store';
import BasketItem from '../../entities/basket/ui/BasketItem';
import type { BasketLine } from '../../entities/basket/types/basketTypes';
import { deleteBasket, loadBaskets } from '../../entities/basket/basketSlice';
import './Basket.css';
import basketP2 from '../../../public/basketP2.jpg';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const basket = useSelector((state: RootState) => state.basket.basket);

  const handleDeleteBasket = (): void => {
    void dispatch(deleteBasket(user.basketId));
  };
  // const calculateTotalItems = (): number => {
  //   if (!basket || !basket.BasketLines) {
  //     return 0;
  //   }
  //   return basket.BasketLines.reduce((total, basketLine) => total + basketLine.quantity, 0);
  // };

  // const totalItems = calculateTotalItems()
  console.log(basket);

  return (
    <div className="Basket">
      <h1>Корзина</h1>
      <div className="container">
        {basket === undefined || basket === null ? (
          <div className="notBasket">
            <div>
              <h1>Ваша корзина пока пустеет</h1>
            </div>
            <Link to="/categories">Приобрести картину</Link>
            <img style={{}} src={basketP2} alt="" />
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'start',display: "flex",
    width:" 100%",
    justifyContent: "flex-end", }}>
              <button onClick={handleDeleteBasket} type="button">
                Очистить корзину
              </button>
            </div>
            <div>
              <div className="basketContener">
                {basket &&
                  basket?.BasketLines.map((basketLine: BasketLine) => (
                    <BasketItem basketLine={basketLine} key={basketLine.id} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BasketPage;
