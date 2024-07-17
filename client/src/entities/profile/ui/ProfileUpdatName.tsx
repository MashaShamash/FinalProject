import React, { useState, ChangeEvent } from 'react';
import './ProfileUpdatName.css';
import type { Profile } from '../types/profileTypes';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { getUpdateProfileThunk } from '../profileSlice';

type ProfileUpdatNameProps = {
    isProfile: Profile;
}

function ProfileUpdatName({ isProfile }: ProfileUpdatNameProps): JSX.Element {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    
    const [name, setName] = useState(isProfile.name);
    const [lastName, setLastName] = useState(isProfile.lastName);
    const [conDan, setConDan] = useState(isProfile.conDan);
    const [activity, setActivity] = useState(isProfile.activity);
    const [biography, setProfilBio] = useState(isProfile.biography);
    const [pseudonym, setProfilPseudonym] = useState(isProfile.pseudonym);
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
    const [imageFile, setImageFile] = useState<File | string>(isProfile.img);

    const onHeandleCreateFigure = (e: React.FormEvent<HTMLElement>): void => {
        e.preventDefault();

        let activityString = activity;
        if (Array.isArray(activity)) {
            activityString = activity.join(', ');
        } else if (typeof activity === 'object') {
            activityString = JSON.stringify(activity);
        }

        const data = new FormData();
        data.append("name", name);
        data.append("lastName", lastName);
        data.append("conDan", conDan);
        data.append("activity", activityString);
        data.append("biography", biography);
        data.append("pseudonym", pseudonym);
        if (imageFile instanceof File) {
            data.append("imageFile", imageFile);
        } else (
            data.append("imageFile", isProfile.img)
        )

        void dispatch(getUpdateProfileThunk({ id: isProfile.id, body: data }));
        setPreviewImage(undefined);
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
            setImageFile(isProfile.img); // или пустую строку, в зависимости от того, что требуется
        }
    }

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<string>>): void => {
        setState(e.target.value);
        e.target.style.height = 'auto'; // сбросить высоту, чтобы правильно определить scrollHeight
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className='ProfileCreateFigure'>
            <h3 className='form-h3'>Изменить личные данные</h3>
            <form className="div-form" action="" onSubmit={onHeandleCreateFigure}>
                <div className='repr'>
                <div className="creat-name" style={{ width: '100%' }}>
                    <label htmlFor="name">
                    <span className='span-for'>Имя:</span>
                        <input 
                            type="text" 
                            className='form__input' 
                            placeholder='Как зовут'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="create-lastName" style={{ width: '100%' }}>
                    <label htmlFor="lastName">
                    <span className='span-for'>Фамилия:</span>
                        <input 
                            type="text" 
                            className='form__input' 
                            placeholder='Фамилия'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="create-img" style={{ width: '100%' }}>
                        <span className='span-for'>Добавить аватар</span>
                        <div className="input__wrapper">
                        <input name="file" type="file" id="input__file" className="input input__file" onChange={onHandleImageChange} multiple/>
                            <label for="input__file" class="input__file-button" >
                                <span className="input__file-icon-wrapper">Выберите файл</span>
                        </label>
                        {previewImage && (
                        <img src={previewImage} alt="Preview" className="preview-image" />
                    )}
                    </div>
                </div>
                <div className="create-conDan" style={{ width: '100%' }}>
                    <label htmlFor="conDan">
                    <span className='span-for'>Контакт:</span>
                        <input 
                            type="text" 
                            className='form__input' 
                            placeholder='Контакт'
                            value={conDan}
                            onChange={(e) => setConDan(e.target.value)}
                        />
                    </label>
                </div>
                </div>
                <div className='peruy'>
                <div className="create-activity" style={{ width: '100%' }}>
                    <label htmlFor="activity">
                    <span className='span-for'>Роль:</span>
                        <input 
                            type="text" 
                            className='form__input' 
                            placeholder='Кто ты?'
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                        />
                    </label>
                </div>
                <div className='div-input-psev' style={{ width: '100%' }}>
                <span className='span-for'>Псевдоним:</span>
                    <span className='span-fo'>Колличество символов: {pseudonym.length} /100</span>
                    <textarea
                        value={pseudonym}
                        className='textarea-bio'
                        placeholder='Псевдоним'
                        onChange={(e) => handleTextareaChange(e, setProfilPseudonym)}
                        maxLength={100}
                        style={{ maxHeight: '150px', overflow: 'auto' }}
                    />
                </div>
                <div className='div-input-psev' style={{ width: '100%' }}>
                <span className='span-for'>Биография:</span>
                    <span className='span-fo'>Колличество символов: {biography.length} /500</span>
                    <textarea
                        value={biography}
                        className='textarea-bio'
                        placeholder='Биография'
                        onChange={(e) => handleTextareaChange(e, setProfilBio)}
                        maxLength={500}
                        style={{ maxHeight: '250px', overflow: 'auto' }}
                    />
                </div>
                <button type="submit">Добавить</button>
                </div>
            </form>
            
        </div>
    );
}

export default ProfileUpdatName;
