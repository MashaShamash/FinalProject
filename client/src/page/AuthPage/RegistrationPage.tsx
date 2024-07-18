import React, { useState } from 'react';
import './Registration.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '../../app/store/store';
import {object, string, ref} from 'yup'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import {  getRegistrationThunk } from '../../entities/auth/authSlice';
import { UserWithoutIdWithPassword } from '../../entities/auth/types/userTypes';
import { getCreateProfileThunk } from '../../entities/profile/profileSlice';




interface RegistrationFormInputs {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
}


const schema = object().shape({
  name: 
  string()
  .trim()
  .required('Обязательно для заполнения'),
  lastName: 
  string()
  .trim()
  .required('Обязательно для заполнения'),
  email: 
  string()
  .email()
  .trim()
  .required('Обязательно для заполнения')
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(ru|com)$/, 'Неверный формат email'),
  password: 
  string()
  .trim()
  .required('Обязательно для заполнения')
  .min(7, 'Пароль должен содержать не менее 7 символов')
  .max(20, 'Пароль не должен быть длиннее 20 символов')
  .matches(/^(?=.*[A-Z])(?=.*[0-9]).*$/, 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру'),
  cpassword: 
  string()
  .trim()
  .required('Обязательно для заполнения')
  .oneOf([ref('password')], 'Пароли должны совпадать'),
})

function RegistrationPage( ): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
 
  const dispatch = useAppDispatch();
 
const {register, handleSubmit, formState: {errors}} = useForm<RegistrationFormInputs>({resolver: yupResolver(schema)})


const onHandleSubmit  = async (user:UserWithoutIdWithPassword):Promise<void> => {
  await dispatch(getRegistrationThunk(user))

  const data = { 
    img: '',
    pseudonym: '', 
    activity: '', 
    biography: '', 
    conDan: '',
  }

  await dispatch(getCreateProfileThunk(data))


}

const togglePasswordVisibility = ():void => {
  setShowPassword(!showPassword);
};

  return (
    <div className="main-div">
    <form className='form' onSubmit={handleSubmit(onHandleSubmit)}>
      <h3 style={{fontSize:"32px"}}className='form__title'>Зарегистрируйтесь</h3>

      <label htmlFor="name">
        <input type="text" className='form__input' {...register('name')}
        placeholder='Name'
        />
        <span>{errors.name?.message}</span>
      </label>
      <label htmlFor="lastName" >
        <input type="text" className='form__input' {...register('lastName')}
        placeholder='lastName'
        />
        <span>{errors.lastName?.message}</span>
      </label>
      <label htmlFor="email" >
        <input type="email" className='form__input' {...register('email')}
        placeholder='Email'
        />
        <span>{errors.email?.message}</span>
      </label>
      <div style ={{width: '305px',  marginTop: '5px'}}className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          className='form__input_prop'
          {...register('password')}
          placeholder='password'
        />
        <button style={{width: '30px'}}
          type="button"
          className="toggle-password-button"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <span>{errors.password?.message}</span>
      <div style ={{width: '305px', marginTop: '5px'}}className="password-input-wrapper" >
        <input 
          type={showPassword ? 'text' : 'password'}
          className='form__input_prop_op'
          placeholder='cpassword'
          {...register('cpassword')}
        />
        <button style={{width: '30px'}}
          type="button"
          className="toggle-password-button"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <span>{errors.cpassword?.message}</span>
      <div className="button-container">
        <button type="submit" className='form__btn'>
          Зарегистрироваться
        </button>
      </div>
    </form>
    </div>
  );
}

export default RegistrationPage;