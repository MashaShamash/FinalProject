import React, { useEffect } from 'react';
// import { Button } from '@mui/material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store/store';
import { useAppDispatch } from '../../app/store/store';
import BasketItem from '../../entities/basket/ui/BasketItem';
import type { Basket, BasketLine } from '../../entities/basket/types/basketTypes';
import { deleteBasket, loadBaskets } from '../../entities/basket/basketSlice';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const basket = useSelector((state: RootState) => state.basket.basket);

  console.log(basket);

  useEffect(() => {
    // сделать так, чтобы у юзера был basketId
    void dispatch(loadBaskets(user.basketId));
  }, [dispatch]);

  // const totalQuantity = baskettt
  //   ? baskettt?.BasketLine.reduce((acc, basketLine) => acc + basketLine.count, 0)
  //   : 0;
  const handleDeleteBasket = (): void => {
    void dispatch(deleteBasket(user.basketId));
  };

  return (
    <div className="Basket">
      <div className="container">
        <h2>корзина</h2>
        {basket && basket.BasketLines && (
          <div style={{ textAlign: 'start' }}>
            <button onClick={handleDeleteBasket} type="button">
              Очистить корзину
            </button>
          </div>
        )}

        {basket && basket.BasketLines && basket.BasketLines && (
          <div>
            <div>
              {basket.BasketLines.map((basketLine: BasketLine) => (
                <BasketItem basketLine={basketLine} key={basketLine.id} />
              ))}
            </div>
            <div>
              {/* <div>
                <h3>Количество товаров</h3>
                <p>{totalQuantity || 0}</p>
              </div>
              <div>
                <h3>Сумма заказа</h3>
                <p> {baskettt.totalAmount} ₽</p>
              </div> */}
              <button className="btn" type="button">
                Оформить заказ
              </button>
            </div>
          </div>
        )}
        {(!basket || !basket.BasketLines) && (
          <div className="message">
            <p>Пока ничего нет</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasketPage;
