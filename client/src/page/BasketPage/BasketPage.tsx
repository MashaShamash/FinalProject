import React from 'react';
// import { Button } from '@mui/material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store/store';
import { useAppDispatch } from '../../app/store/store';
import BasketItem from '../../entities/basket/ui/BasketItem';
import type { BasketLine } from '../../entities/basket/types/basketTypes';
import { deleteBasket } from '../../entities/basket/basketSlice';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  // const user = useSelector((state: RootState) => state.auth.user);
  const userBaskets = useSelector((state: RootState) => state.basket.baskets);
  const baskettt = userBaskets.filter((basket) => !basket.cartStatus)[0];

  const totalQuantity = baskettt
    ? baskettt.BasketLine.reduce((acc, basketLine) => acc + basketLine.count, 0)
    : 0;
  const handleDeleteBasket = () => {
    void dispatch(deleteBasket(baskettt.id));
  };

  return (
    <div className="Basket">
      <div className="container">
        <h2>корзина</h2>
        {baskettt && baskettt.BasketLine.length !== 0 && (
          <div style={{ textAlign: 'start' }}>
            <button onClick={handleDeleteBasket} type="button">
              Очистить корзину
            </button>
          </div>
        )}

        {baskettt && baskettt.BasketLine.length !== 0 && (
          <div className="cart-box">
            <div className="cart-box-left">
              {baskettt.BasketLine.map((basketLine: BasketLine) => (
                <BasketItem basketLine={basketLine} key={basketLine.id} />
              ))}
            </div>
            <div className="cart-box-right">
              <div>
                <h3>Количество товаров</h3>
                <p>{totalQuantity || 0}</p>
              </div>
              <div>
                <h3>Сумма заказа</h3>
                <p> {baskettt.totalAmount} ₽</p>
              </div>
              <button className="btn" type="button">
                Оформить заказ
              </button>
            </div>
          </div>
        )}
        {(!baskettt || !baskettt.BasketLine.length) && (
          <div className="message">
            <p>Пока ничего нет</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasketPage;
