import React, { useState } from 'react';
import { useAppDispatch } from '../../app/store/store';
import './Registration.css'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import {object, string} from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserWithoutNameAndLastName } from '../../entities/auth/types/userTypes';
import { getAuthorizationThunk } from '../../entities/auth/authSlice';

interface RegistrationFormInputs {
  email: string;
  password: string;
  
}


const schema = object().shape({
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
  .matches(/^(?=.*[A-Z])(?=.*[0-9]).*$/, 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру')
})




function AuthorizationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  

  const {register, handleSubmit, formState: {errors}} = useForm<RegistrationFormInputs>({resolver: yupResolver(schema)})

  const onHandleAuth = (user: UserWithoutNameAndLastName):void => {
    void dispatch(getAuthorizationThunk(user))
    
  }

  const togglePasswordVisibility = ():void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main-div">
    <form className='form' onSubmit={handleSubmit(onHandleAuth)}>
      <h3 className='form__title'>Авторизируйтесь, чтобы собирать произведения ведущих художников мира.</h3>
      <label htmlFor="email" >
        <input type="email" className='form__input' {...register('email')}
        placeholder='Email'
        />
        <span>{errors.email?.message}</span>
      </label>
      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          className='form__input_prop'
          {...register('password')}
          placeholder='password'
        />
        <button
          type="button"
          className="toggle-password-button"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <span style={{width: '200px'}}>{errors.password?.message}</span>
      <div className="button-container">
        <button type="submit" className='form__btn'>
          Войти
        </button>
      </div>
    </form>
    </div>
  );
}

export default AuthorizationPage;