import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, CLEAR_AUTH_PROCESS, LOAD_CURRENT_USER } from '../type';
import API from '../../utils/API';
import { getUsersList } from './users.actions';

export const loadUser = () => async (dispatch) => {
       try {
              const response = await API.get('/users/details');
              dispatch({ type: LOAD_CURRENT_USER, payload: response });
       } catch (error) {
              console.log('error loadUser', error);
       }
};
export const register = (data) => async (dispatch) => {
       try {
              const res = await API.post('auth/register', data);
              dispatch(getUsersList());
              return dispatch({
                     type: REGISTER_SUCCESS,
                     payload: res,
              });
       } catch (error) {
              console.log('register error ', error);
              dispatch({
                     type: REGISTER_FAILURE,
                     payload: error,
              });
       }
};

export const login = (data) => async (dispatch) => {
       try {
              const res = await API.post('auth/login', data);
              localStorage.setItem('access_token', res.tokens?.access?.token);
              localStorage.setItem('refresh_token', res.tokens?.refresh?.token);
              dispatch(loadUser());
              return dispatch({
                     type: LOGIN_SUCCESS,
                     payload: res,
              });
       } catch (error) {
              console.log('login error ', error);
              return dispatch({
                     type: LOGIN_FAILURE,
                     payload: error,
              });
       }
};
export const clearAuthProcess = () => (dispatch) => dispatch({ type: CLEAR_AUTH_PROCESS });

export const logout = (history) => () => {
       localStorage.removeItem('access_token');
       history.push('/login');
};
