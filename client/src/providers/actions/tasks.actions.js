import { TASKS_GET_ALL } from '../type';
import API from '../../utils/API';
export const createNewTask = (data, modal, err) => async (dispatch) => {
       try {
              const response = await API.post('/tasks/', data);
              dispatch(getAllTasks());

              modal(false);
       } catch (error) {
              console.log('error createNewTask', error);
              if (error?.task) err({ taskName: { message: error.task } });
       }
};
export const getAllTasks = (id) => async (dispatch) => {
       try {
              let query = '';
              if (id) query = '?changedBy=' + id;
              const response = await API.get('/tasks/' + query);
              dispatch({ type: TASKS_GET_ALL, payload: response.results.reverse() });
       } catch (error) {
              console.log('error getAllTasks', error);
       }
};
export const deleteTask = (id) => async (dispatch) => {
       try {
              const response = await API.delete('/tasks/' + id);
              dispatch(getAllTasks());
       } catch (error) {
              console.log('error deleteTask', error);
       }
};
export const getTasksByUserID = (id) => async (dispatch) => {
       try {
              const response = await API.get('/tasks?changedBy=' + id);
              dispatch({ type: 'ARTICLES_GET_BY_USER_ID', payload: response.results.reverse() });
       } catch (error) {
              console.log('error loadUser', error);
       }
};
export const updateTaskStatus = (id, status, UID, comment, modal) => async (dispatch) => {
       try {
              const response = await API.patch('/tasks/' + id, { status: status, comment });
              dispatch(getTasksByUserID(UID));
              modal && modal(false);
       } catch (error) {
              console.log('error loadUser', error);
       }
};
export const updateTask = (id, UID, data, modal, setFinishedTaskData) => async (dispatch) => {
       try {
              const response = await API.patch('/tasks/' + id, data);
              UID ? dispatch(getTasksByUserID(UID)) : dispatch(getAllTasks());
              modal && modal(false);
              setFinishedTaskData({});
       } catch (error) {
              console.log('error loadUser', error);
       }
};
