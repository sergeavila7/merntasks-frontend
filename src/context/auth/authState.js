import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from '../../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    auth: null,
    user: null,
    message: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (datos) => {
    try {
      const res = await clientAxios.post('/api/users', datos);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Obtener el usuario
      userAuth();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: 'alert-error',
      };
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  // Retorna el usuario auth
  const userAuth = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      // TODO: Función para enviar el token por headers
      tokenAuth(token);
    }
    try {
      const response = await clientAxios.get('/api/auth');
      // console.log(response);
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: LOGIN_ERROR });
    }
  };

  // Cundo el usuarios inicia sesion
  const logIn = async (data) => {
    try {
      const response = await clientAxios.post('/api/auth', data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });

      // Obtener el usuario
      userAuth();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: 'alert-error',
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  // Cerrar sesion
  const logOut = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        logIn,
        userAuth,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
