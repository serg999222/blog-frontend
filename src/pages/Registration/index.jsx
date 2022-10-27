import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { getAuthData, selectIsAuth, fetchRegister } from '../../redux/slises/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styles from './Login.module.scss';
import { Navigate } from "react-router-dom";


export const Registration = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Не вийшло зареєструватися!')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('fullName', { required: 'Вкажіть Ваше прізвище на ім\'я' })}
          className={styles.field} label="Повне ім\'я" fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message} />
        <TextField  {...register('email', { required: 'Вкажіть Ваш емейл' })}
          className={styles.field} label="E-Mail" fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message} />
        <TextField {...register('password', { required: 'Вкажіть Ваш пароль' })}
          className={styles.field} label="Пароль" fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message} />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
