import React from 'react';
import { useAppDispatch } from '../../app/store/store';
// import './AuthorizationPage.css'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import {object, string} from 'yup'
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
  

  const {register, handleSubmit, formState: {errors}} = useForm<RegistrationFormInputs>({resolver: yupResolver(schema)})

  const onHandleAuth = (user: UserWithoutNameAndLastName):void => {
    void dispatch(getAuthorizationThunk(user))
    
  }

  return (
    <form className='form' onSubmit={handleSubmit(onHandleAuth)}>
        <h3 className='form__title'>Вход</h3>
        <label htmlFor="email">
        Email:
        <input type="email" className='form__input' {...register('email')}
        />
        <span>{errors.email?.message}</span>
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" className='form__input' {...register('password')}
        />
        <span>{errors.password?.message}</span>
      </label>
      <button type="submit" className='form__btn'>login</button>
    </form>
  );
}

export default AuthorizationPage;