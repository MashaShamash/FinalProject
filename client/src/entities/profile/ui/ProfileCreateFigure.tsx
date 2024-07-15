import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import {object, string, ref} from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { createFigureThunk, updateFigureThunk } from '../../figures/figuresSlice';
import { FigureWithoutIdAndWithoutUserIdAndWithoutNamelastNamePseudonym } from '../../figures/types/figureTypes';

interface CreateFormInputs {
    title:string;
    date: string;
    img: string;
    materials: string,
    height: string;
    price: string;
    biography: string;
    width: string;
    categoryId: string;
    sell: boolean;
  }
type ProfileCreateFigureProps={
}
const ProfileCreateFigure = ({}: ProfileCreateFigureProps): JSX.Element =>{
    const {user} = useAppSelector((state) => state.auth)
    const { categories } = useAppSelector((state) => state.categories);
    const { figures } = useAppSelector((state) => state.figures);
    const [selectCategor, setSelectCategor] = useState<string>('');
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState(0)
    const [img, setImg] = useState('')
    const [materials, setMaterials] = useState('')
    const [height, setHeight] = useState(0)
    const [price, setPrice] = useState(0)
    const [biography, setBiography] = useState('')
    const [width, setWidth] = useState(0)
    const [categoryId, setCategoryId] = useState(0)



    const onHeandleCreateFigure = (e:React.FormEvent<HTMLElement>): void  => {
        e.preventDefault()

        void dispatch(createFigureThunk({title, date, img, materials, height, price, biography, width, categoryId, sell: false}))
    }

return (
<div className=' ProfileCreateFigure'>
    <form action="" onSubmit={onHeandleCreateFigure}>
        <h3></h3>
        <div className="creat-title">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-date">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={date}
        onChange={(e) => setDate(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-img">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={img}
        onChange={(e) => setImg(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-material">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={materials}
        onChange={(e) => setMaterials(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-height">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={height}
        onChange={(e) => setHeight(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-price">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-biography">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-width">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Name'
        value={width}
        onChange={(e) => setWidth(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="selector-categor">
            <span className='category-span'>Категория: </span>
                 <select 
                        value={categoryId}
                        className='category-sel'
                        onChange={(e) => setCategoryId(+e.target.value)}>
                        <option value="">Выбрать категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
            </select>
        </div>
        <button type="submit">Добавить</button>
    </form>
 </div>
 );

}
export default ProfileCreateFigure
