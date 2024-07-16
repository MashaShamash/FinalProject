import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { Figure } from '../types/figureTypes';
import './figure.css';



function FiguresParams(): JSX.Element {
  const { figId } = useParams<{ figId: string }>();


  const { figures } = useAppSelector((state) => state.figures);
  const figure = figures.find((f) => f.id === +figId);


  if (!figure) {
    return <p>Figure not found</p>;
  }

  return (
    <div className="figureItem">
      <div>
        <img src={figure.img} alt='foto' />
        <p className='bold'>Название картины: {figure.title}</p>
        <p>Имя художника: {figure.name}</p>
        <p>Фамилия художника: {figure.lastName}</p>
        <p>Псевдоним художника: {figure.pseudonym}</p>
        <p>Биография художника: {figure.biography}</p>
        <p>Дата публикации работы: {figure.date} год</p>
        <p>Материал: {figure.materials}</p>
        <p>Высота холста: {figure.height} см</p>
        <p>Ширина холста: {figure.width} см</p>
        <p className='bold'>Стоимость: {figure.price} $</p>
      </div>
    </div>
  );
}

export default FiguresParams;
