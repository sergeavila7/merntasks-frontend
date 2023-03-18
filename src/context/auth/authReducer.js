/* eslint-disable no-fallthrough */
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from '../../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        auth: true,
        message: null,
      };
    case GET_USER:
      return {
        ...state,
        auth: true,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        auth: null,
        message: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
