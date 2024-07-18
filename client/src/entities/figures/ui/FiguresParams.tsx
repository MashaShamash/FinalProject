import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { Figure } from '../types/figureTypes';
import './FiguresParams.css';
import { addToBasket } from '../figuresSlice';

function FiguresParams(): JSX.Element {
  let user;
  const dispatch = useAppDispatch();
  const { figId } = useParams<{ figId: string }>();
  const [openBasket, setOpenBasket] = useState(false);
  const { figures } = useAppSelector((state) => state.figures);
  const figure = figures.find((f) => f.id === +figId);

  if (!figure) {
    return <p>Figure not found</p>;
  }
  const handleAddToBasket = (): void => {
    void dispatch(addToBasket(figure.id));
    setOpenBasket(true);
  };

  return (
    <div className="figureItem">
      <img src={figure.img} alt="foto" />
      <div className="figureItemText">
        <p className="bold">Название картины: {figure.title}</p>
        <p>Имя художника: {figure.name}</p>
        <p>Фамилия художника: {figure.lastName}</p>
        <p>Псевдоним художника: {figure.pseudonym}</p>
        <p>Биография художника: {figure.biography}</p>
        <p>Дата публикации работы: {figure.date} год</p>
        <p>Материал: {figure.materials}</p>
        <p>Высота холста: {figure.height} см</p>
        <p>Ширина холста: {figure.width} см</p>

        <p className="bold">Стоимость: {figure.price} руб.</p>
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '10px',
            border: 'solid 1px',
            borderRadius: '10px',
            fontSize: '18px',
          }}
          className="btn"
          type="button"
          onClick={() => handleAddToBasket()}
        >
          добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default FiguresParams;
