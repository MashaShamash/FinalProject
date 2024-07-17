
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store/store';
import { useAppDispatch } from '../../app/store/store';
import BasketItem from '../../entities/basket/ui/BasketItem';
import type { BasketLine } from '../../entities/basket/types/basketTypes';
import { deleteBasket, loadBaskets } from '../../entities/basket/basketSlice';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const basket = useSelector((state: RootState) => state.basket.basket);

  // console.log(basket);

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
        <div
          style={{ position: 'relative', overflow: 'hidden', width: '100vw', marginTop: '20px', height:"200px" }}
        >
          <img
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: '0',
              opacity: "0.6"
            }}
            src="https://i.pinimg.com/564x/08/2b/72/082b7236e9ffa750debcc6cbe209500e.jpg"
            alt=""
          />
          {(!basket || !basket.BasketLines) && (
            <div
              style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                position: 'relative',
                zIndex: '1',
                padding: '20px',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              }}
            >
              <h1>Вы пока ничего не выбрали</h1>
            </div>
          )}
        </div>
        {basket && basket.BasketLines && (
          <div style={{ textAlign: 'start' }}>
            <button onClick={handleDeleteBasket} type="button">
              Очистить корзину
            </button>
          </div>
        )}

        {basket && basket.BasketLines && basket.BasketLines && (
          <div>
            <div className='basketContener'>
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
      </div>
    </div>
  );
}

export default BasketPage;
