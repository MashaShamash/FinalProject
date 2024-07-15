import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { Figure } from '../types/figureTypes';

function FiguresParams(): JSX.Element {
  const { figId } = useParams<{ figId: string }>();
  console.log(111, figId);
  const { figures } = useAppSelector((state) => state.figures);

  const figure = figures.find((f) => f.id === +figId);
  console.log(9999, figure);

  if (!figure) {
    return <p>Figure not found</p>;
  }

  return (
    <div className="figureCard">
      <div>
        <img src={figure.img} alt='foto' />
        <p>Название картины: {figure.title}</p>
        <p>Имя художника: {figure.name}</p>
        <p>Фамилия художника: {figure.lastName}</p>
        <p>Псевдоним художника: {figure.pseudonym}</p>
        <p>Биография художника: {figure.biography}</p>
        <p>Дата публикации работы: {figure.date}</p>
        <p>Материал: {figure.materials}</p>
        <p>Высота холста: {figure.height} см</p>
        <p>Ширина холста: {figure.width} см</p>
        <h3>Стоимость: {figure.price} $</h3>
     
      </div>
    </div>
  );
}

export default FiguresParams;
