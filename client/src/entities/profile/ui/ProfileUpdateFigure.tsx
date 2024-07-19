// @ts-nocheck
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { updateFigureThunk } from '../../figures/figuresSlice';
import type { Profile } from '../types/profileTypes';
import type { Figure } from '../../figures/types/figureTypes';
import './ProfileCreateFigure.css';

type ProfileCreateFigureProps = {
  figure: Figure;
  isProfile: Profile;
  setActiveUpdate: (value: boolean) => void;
};

function ProfileUpdateFigure({
  figure,
  isProfile,
  setActiveUpdate,
}: ProfileCreateFigureProps): JSX.Element {
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(figure.title);
  const [date, setDate] = useState(figure.date);
  const [materials, setMaterials] = useState(figure.materials);
  const [height, setHeight] = useState(figure.height);
  const [price, setPrice] = useState(figure.price);
  const [width, setWidth] = useState(figure.width);
  const [categoryId, setCategoryId] = useState(figure.categoryId);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | string>(figure.img);

  const onHeandleUpdateFigure = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    console.log(imageFile);

    const data = new FormData();
    data.append('title', title);
    data.append('date', date.toString());
    data.append('materials', materials);
    data.append('height', height.toString());
    data.append('price', price.toString());
    data.append('width', width.toString());
    data.append('pseudonym', isProfile.pseudonym);
    data.append('biography', isProfile.biography);
    data.append('categoryId', categoryId.toString());
    if (imageFile instanceof File) {
      data.append('imageFile', imageFile);
    } else data.append('imageFile', figure.img);

    void dispatch(updateFigureThunk({ id: figure.id, body: data }));
    if (imageFile instanceof File) {
      setImageFile(figure.img);
    }
    setActiveUpdate(false);
  };

  const onHandleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Если файл не выбран, сбрасываем предпросмотр и imageFile
      setPreviewImage(undefined);
      setImageFile(figure.img); // или пустую строку, в зависимости от того, что требуется
    }
  };

  return (
    <div className="ProfileCreateFigure">
      <h3 className="span-f">Редактировать пост</h3>
      <form action="" className="form-create" onSubmit={onHeandleUpdateFigure}>
        <div className="one-div-create">
          <div className="creat-title">
            <span className="span-for">Название картины</span>
            <label htmlFor="name">
              <input
                type="text"
                className="form__input"
                placeholder={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className="create-date">
            <span className="span-for">Год создания картины</span>
            <label htmlFor="name">
              <input
                type="number"
                className="form__input"
                placeholder={date.toString()}
                value={date}
                onChange={(e) => setDate(+e.target.value)}
              />
            </label>
          </div>
          <div className="create-img">
            <label htmlFor="name">
              <span className="span-for">Добавить картину</span>
              <input type="file" className="form__input" onChange={onHandleImageChange} />
            </label>
            {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
          </div>
          <div className="create-material">
            <span className="span-for">Материалы</span>
            <label htmlFor="name">
              <input
                type="text"
                className="form__input"
                placeholder={materials}
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="two-div-create">
          <div className="create-height">
            <span className="span-for">Высота картины, мм</span>
            <label htmlFor="name">
              <input
                type="number"
                className="form__input"
                placeholder={height.toString()}
                value={height}
                onChange={(e) => setHeight(+e.target.value)}
              />
            </label>
          </div>
          <div className="create-price">
            <span className="span-for">Стоимость картины, руб</span>
            <label htmlFor="name">
              <input
                type="number"
                className="form__input"
                placeholder={price.toString()}
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </label>
          </div>
          <div className="create-width">
            <span className="span-for">Ширина картины, мм</span>
            <label htmlFor="name">
              <input
                type="number"
                className="form__input"
                placeholder={width.toString()}
                value={width}
                onChange={(e) => setWidth(+e.target.value)}
              />
            </label>
          </div>
          <div className="selector-categor">
            <span className="span-for">Категория: </span>
            <select
              value={categoryId}
              className="category-sel"
              onChange={(e) => setCategoryId(+e.target.value)}
            >
              <option value="">Выбрать категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button style={{ marginLeft: '40px' }} type="submit">
          Изменить
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdateFigure;
