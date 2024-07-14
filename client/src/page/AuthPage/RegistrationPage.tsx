import React from 'react';

import { useAppDispatch } from '../../app/store/store';
import {object, string, ref} from 'yup'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import { getRegistrationThunk } from '../../entities/auth/authSlice';
import { UserWithoutIdWithPassword } from '../../entities/auth/types/userTypes';



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


function RegistrationPage(): JSX.Element {
 
  const dispatch = useAppDispatch();
 
const {register, handleSubmit, formState: {errors}} = useForm<RegistrationFormInputs>({resolver: yupResolver(schema)})


const onHandleSubmit  = (user:UserWithoutIdWithPassword):void => {
  void dispatch(getRegistrationThunk(user))
  
}

  return (
    
    <form className='form' onSubmit={handleSubmit(onHandleSubmit)}>
      <h3 className='form__title'>Регистрация</h3>
      <label htmlFor="name">
        Name:
        <input type="text" className='form__input' {...register('name')}
        />
        <span>{errors.name?.message}</span>
      </label>
      <label htmlFor="lastName">
        lastName:
        <input type="text" className='form__input' {...register('lastName')}
        />
        <span>{errors.lastName?.message}</span>
      </label>
      <br />
      <label htmlFor="email">
        Email:
        <input type="email" className='form__input' {...register('email')}
        />
        <span>{errors.email?.message}</span>
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input type="password" className='form__input' {...register('password')}
        />
        <span>{errors.password?.message}</span>
      </label>
      <br />
      <label htmlFor="cpassword">
        Check password:
        <input type="password" className='form__input' {...register('cpassword')}
        />
        <span>{errors.cpassword?.message}</span>
      </label>
      <br />
      <div className="button-container">
        <button type="submit" className='form__btn'>
          Sign up
        </button>
      </div>
    </form>
  );
}

export default RegistrationPage;