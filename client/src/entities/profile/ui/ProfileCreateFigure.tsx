import './ProfileCreateFigure.css'
import type { ChangeEvent} from 'react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { createFigureThunk} from '../../figures/figuresSlice';
import type { Profile } from '../types/profileTypes';


type ProfileCreateFigureProps={
    isProfile: Profile
    setActive: (value: boolean) => void;
}

function ProfileCreateFigure({isProfile, setActive}: ProfileCreateFigureProps): JSX.Element {
    const {user} = useAppSelector((state) => state.auth)
    const { categories } = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch()
    console.log(99999999999, isProfile?.pseudonym);
    

    const [title, setTitle] = useState('')
    const [date, setDate] = useState(2024)
    const [materials, setMaterials] = useState('')
    const [height, setHeight] = useState(100)
    const [price, setPrice] = useState(110)
    const [width, setWidth] = useState(100)
    const [categoryId, setCategoryId] = useState(0)
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
    const [imageFile, setImageFile] = useState<string>('');


    const onHeandleCreateFigure = (e:React.FormEvent<HTMLElement>): void  => {
        e.preventDefault()
        console.log(imageFile);

        const data = new FormData()
        data.append("title", title)
        data.append("date", date.toString())
        data.append("materials", materials)
        data.append("height", height.toString())
        data.append("price", price.toString())
        data.append("width", width.toString())
        data.append("pseudonym", isProfile.pseudonym)
        data.append("biography", isProfile.biography)
        data.append("categoryId", categoryId.toString())
        data.append("imageFile", imageFile)
        
        void dispatch(createFigureThunk(data))
        
        setPreviewImage(undefined)
        setTitle('')
        setDate(2024)
        setMaterials('')
        setHeight(100)
        setPrice(1000)
        setWidth(100)
        setCategoryId(0)
        setImageFile('')
        setActive(false)
        

    }
    
    const onHandleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file);
  
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };


return (
<div className='ProfileCreateFigure'>
<h3 className='span-f'>Добавить искусства</h3>
    <form action="" className='form-create' onSubmit={onHeandleCreateFigure}>
        <div className='one-div-create'>
        <div className="creat-title">
        <span className='span-for'>Название картины</span>
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Название картины'
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-date">
        <span className='span-for'>Год создания картины</span>
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder='Год создания картины'
        required
        onChange={(e) => setDate(+e.target.value)}
        />
        <span>{}</span>
      </label>
      </div>
      <div className="create-img">
                <label htmlFor="name">
                    <span className='span-for'>Добавить картину</span>
                    <input type="file" className='form__input' 
                        placeholder='Картинка'
                        onChange={onHandleImageChange}
                        required
                    />
                </label>
                {previewImage && (
                    <img src={previewImage} alt="Preview" className="preview-image" />
                )}
            </div>
            
        <div className="create-material">
        <span className='span-for'>Материалы</span>
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Материалы'
        value={materials}
        required
        onChange={(e) => setMaterials(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        </div>
        <div className='two-div-create'>
        <div className="create-height">
        <span className='span-for'>Высота картины, мм</span>
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder='Высота картины'
        required
        onChange={(e) => setHeight(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-price">
        <span className='span-for'>Стоимость картины, руб</span>
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder='Стоимость'
        required
        onChange={(e) => setPrice(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        
        <div className="create-width">
        <span className='span-for'>Ширина картины, мм</span>
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder='Ширина'
        required
        onChange={(e) => setWidth(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="selector-catego">
            <span className='span-for'>Категория: </span>
                 <select 
                        value={categoryId}
                        required
                        onChange={(e) => setCategoryId(+e.target.value)}>
                        <option value="">Выбрать категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
            </select>
        </div>
        </div>
        <button style={{marginLeft: '40px'}} type="submit">Добавить</button>
    </form>
 </div>
 );

}
export default ProfileCreateFigure
