import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../app/store/store';
import { useAppDispatch } from '../../app/store/store';
import BasketItem from '../../entities/basket/ui/BasketItem';
import type { BasketLine } from '../../entities/basket/types/basketTypes';
import { deleteBasket, loadBaskets } from '../../entities/basket/basketSlice';
import './Basket.css';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const basket = useSelector((state: RootState) => state.basket.basket);
  // const basketOne = basket?.BasketLine.filter((bas) => !bas.cartStatus);
  console.log(11111, basket);
  // console.log(22222, basketOne);

  // useEffect(() => {
  //   void dispatch(loadBaskets(user.basketId));
  // }, [dispatch]);

  // const totalQuantity = basket
  //   ? basketOne.BasketLines.reduce((acc, basketLine) => acc + basketLine.count, 0)
  //   : 0;

  // const totalAmount = basket
  //   ? basketOne.BasketLines.reduce(
  //       (acc, basketLine) => acc + basketLine.count * basketLine.product.price,
  //       0,
  //     )
  //   : 0;

  const handleDeleteBasket = (): void => {
    void dispatch(deleteBasket(user.basketId));
  };

  return (
    <div className="Basket">
      <h1>Корзина</h1>
      <div className="container">
        {basket?.BasketLines.length === 0 ? (
          <div className="notBasket">
            <div>
              <h1>Ваша корзина пока пустеет</h1>
            </div>
            <Link to="/categories">Приобрести картину</Link>
            <img style={{}} src="../../../public/basketP2.jpg" alt="" />
          </div>
        ) : (
          <>
            <div>
              <div className="basketContener">
                {basket &&
                  basket?.BasketLines.map((basketLine: BasketLine) => (
                    <BasketItem basketLine={basketLine} key={basketLine.id} />
                  ))}
              </div>
              {/* <div>
                <div>
                  <h3>Количество товаров</h3>
                  <p>{totalQuantity || 0}</p>
                </div>
                <div>
                  <h3>Сумма заказа</h3>
                  <p> {basket.totalAmount} ₽</p>
                </div>
                <button className="btn" type="button">
                  Оформить заказ
                </button>
              </div> */}
            </div>
            <div style={{ textAlign: 'start' }}>
              <button onClick={handleDeleteBasket} type="button">
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BasketPage;
