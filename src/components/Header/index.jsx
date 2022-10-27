import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint'
import { selectIsAuth, logout } from '../../redux/slises/auth'
import { useDispatch, useSelector } from 'react-redux';

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  console.log(isAuth)
  const onClickLogout = () => {
    if (window.confirm('Ви впевнені що бажаєте вийти?')) {
      dispatch(logout())
    }

  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>

          <Link className={styles.logo} to="/">
            <div>
              Blog for programming lovers</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="add-post">
                  <Button variant="contained">Написати статтю</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <IconButton aria-label="fingerprint" color="inherit">
                    <Fingerprint size="small" />Війти
                  </IconButton>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
