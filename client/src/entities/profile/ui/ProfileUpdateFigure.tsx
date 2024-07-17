
import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { updateFigureThunk} from '../../figures/figuresSlice';
import { Profile } from '../types/profileTypes';
import { Figure } from '../../figures/types/figureTypes';


type ProfileCreateFigureProps={
    figure: Figure
    isProfile: Profile
}
const ProfileUpdateFigure = ({figure, isProfile}: ProfileCreateFigureProps): JSX.Element =>{
    const {user} = useAppSelector((state) => state.auth)
    const { categories } = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch()
    console.log(99999999999, isProfile?.pseudonym);
    

    const [title, setTitle] = useState(figure.title)
    const [date, setDate] = useState(figure.date)
    const [materials, setMaterials] = useState(figure.materials)
    const [height, setHeight] = useState(figure.height)
    const [price, setPrice] = useState(figure.price)
    const [width, setWidth] = useState(figure.width)
    const [categoryId, setCategoryId] = useState(figure.categoryId)

    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
    const [imageFile, setImageFile] = useState<string>(figure.img);


    const onHeandleUpdateFigure = (e:React.FormEvent<HTMLElement>): void  => {
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
        
        void dispatch(updateFigureThunk({id:figure.id, body: data}))

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
<div className=' ProfileCreateFigure'>
    <form action="" onSubmit={onHeandleUpdateFigure}>
        <h3></h3>
        <div className="creat-title">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder={title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-date">
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder={date.toString()}
        value={date}
        onChange={(e) => setDate(+e.target.value)}
        />
        <span>{}</span>
      </label>
      </div>
      <div className="create-img">
                <label htmlFor="name">
                    <span>Добавить картину</span>
                    <input type="file" className='form__input' 
                        placeholder='Картинка'
                        onChange={onHandleImageChange}
                    />
                </label>
                {previewImage && (
                    <img src={previewImage} alt="Preview" className="preview-image" />
                )}
            </div>
        <div className="create-material">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder={materials}
        value={materials}
        onChange={(e) => setMaterials(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-height">
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder={height.toString()}
        value={height}
        onChange={(e) => setHeight(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-price">
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder={price.toString()}
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-width">
        <label htmlFor="name">
        <input type="number" className='form__input' 
        placeholder={width.toString()}
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
        <button type="submit">Изменить</button>
    </form>
 </div>
 );

}
export default ProfileUpdateFigure