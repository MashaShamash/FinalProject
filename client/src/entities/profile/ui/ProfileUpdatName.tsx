import type { ChangeEvent} from 'react';
import React, { useState } from 'react';
import type { Profile } from '../types/profileTypes';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import {  getUpdateProfileThunk } from '../profileSlice';

type ProfileUpdatNameProps={
    isProfile: Profile;
}
function ProfileUpdatName({isProfile}: ProfileUpdatNameProps): JSX.Element {
    const {user} = useAppSelector((state) => state.auth)
    const { categories } = useAppSelector((state) => state.categories);
    const { figures } = useAppSelector((state) => state.figures);
    const dispatch = useAppDispatch()
    console.log(99999999999, isProfile?.pseudonym);
    

    const [name, setName] = useState(isProfile.name)
    const [lastName, setLastName] = useState(isProfile.lastName)
    const [conDan, setConDan] = useState(isProfile.conDan)
    const [activity, setActivity] = useState(isProfile.activity)
    const [biography, setProfilBio] = useState(isProfile.biography)
    const [pseudonym, setProfilPseudonym] = useState(isProfile.pseudonym)
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
    const [imageFile, setImageFile] = useState<string>('');

    const onHeandleCreateFigure = (e:React.FormEvent<HTMLElement>): void  => {
        e.preventDefault()

        let activityString = activity;
        if (Array.isArray(activity)) {
            activityString = activity.join(', '); 
        } else if (typeof activity === 'object') {
            activityString = JSON.stringify(activity);
        }


        const data = new FormData()
        data.append("name", name)
        data.append("lastName", lastName)
        data.append("conDan", conDan)
        data.append("activity", activityString)
        data.append("biography", biography)
        data.append("pseudonym", pseudonym)
        data.append("imageFile", imageFile)
        
        console.log(imageFile);
        


        void dispatch(getUpdateProfileThunk({id:isProfile.id, body: data}))
        setPreviewImage(prev => undefined)
        setImageFile('')

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
    <form action="" onSubmit={onHeandleCreateFigure}>
        <h3 />
        <div className="creat-name">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Как зовут'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-lastName">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Фамилия'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
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
        <div className="create-conDan">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='контакт'
        value={conDan}
        onChange={(e) => setConDan(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div className="create-activity">
        <label htmlFor="name">
        <input type="text" className='form__input' 
        placeholder='Кто ты?'
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        />
        <span>{}</span>
      </label>
        </div>
        <div>
             <span className='span-form'>Колличество символов: {pseudonym.length} /100</span>
                <input
                  value={pseudonym}
                    className='textarea-bio'
                    placeholder={pseudonym}
                    onChange={(e) => setProfilPseudonym(e.target.value)}
                    maxLength={100}
                     />
            </div>
            <div>
                    <span className='span-form'>Колличество символов: {biography.length} /500</span>
                    <input
                    value={biography}
                    className='textarea-bio'
                    placeholder={biography}
                    onChange={(e) => setProfilBio(e.target.value)}
                    rows={4}// Устанавливаем высоту textarea на 4 строки
                    // cols="50" // Ширина textarea в символах
                    maxLength={500}
                     />
            </div>
        <button type="submit">Добавить</button>
    </form>
 </div>
 );

}
export default ProfileUpdatName
