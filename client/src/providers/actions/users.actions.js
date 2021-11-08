import { USER_GET_ALL } from '../type';
import API from '../../utils/API';
export const getUsersList = () => async (dispatch) => {
       try {
              const response = await API.get('/users/');
              dispatch({ type: USER_GET_ALL, payload: response.results.reverse() });
       } catch (error) {
              console.log('error loadUser', error);
       }
};
export const deleteUserById = (id) => async (dispatch) => {
       try {
              const response = await API.delete('/users/' + id);
              dispatch(getUsersList());
       } catch (error) {
              console.log('error loadUser', error);
       }
};
export const updateUserById = (id, data, modal) => async (dispatch) => {
       try {
              delete data.registered;
              delete data.action;
              delete data.id;
              delete data.role;
              delete data.name;
              const response = await API.patch('/users/' + id, data);
              if (response) modal(false);
              dispatch(getUsersList());
       } catch (error) {
              console.log('error loadUser', error);
       }
};
