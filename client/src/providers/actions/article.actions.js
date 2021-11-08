import { ARTICLES_GET_ALL } from '../type';
import API from '../../utils/API';
export const gteListArticle = () => async (dispatch) => {
       try {
              const response = await API.get('/articles/');
              dispatch({ type: ARTICLES_GET_ALL, payload: response.results.reverse() });
       } catch (error) {
              console.log('error loadUser', error);
       }
};
export const createNewArticle = (body, modal, errorProvider) => async (dispatch) => {
       try {
              const response = await API.post('/articles/', body, {
                     headers: { 'Content-Type': 'multipart/form-data' },
              });
              modal(false);
              dispatch(gteListArticle());
       } catch (error) {
              console.log('error loadUser', error);

              errorProvider({
                     articleName: {
                            message: error.article,
                     },
              });
       }
};
export const deleteArticle = (id) => async (dispatch) => {
       try {
              console.log(id);
              const response = await API.delete('/articles/' + id);

              dispatch(gteListArticle());
       } catch (error) {
              console.log('error loadUser', error);
       }
};

export const getCatList = () => async (dispatch) => {
       try {
              const response = await API.get('/articles/category');
              dispatch({ type: 'CAT_GET_ALL', payload: response.results.reverse() });
       } catch (error) {
              console.log('error loadUser', error);
       }
};
export const createNewCat = (body, setErrors) => async (dispatch) => {
       try {
              console.log('body', body);

              const response = await API.post('/articles/category/', { categoriesName: body });
              dispatch(getCatList());
       } catch (error) {
              console.log('error loadUser', error);
              setErrors({
                     categoriesName: {
                            message: 'category name already used',
                     },
              });
       }
};

export const editArticle = (body, id, setModal) => async (dispatch) => {
       try {
              const response = await API.patch('/articles/' + id, body);
              dispatch(gteListArticle());
              setModal(false);
       } catch (error) {
              console.log('error loadUser', error);
       }
};

export const deleteCat = (id) => async (dispatch) => {
       try {
              const response = await API.delete('/articles/category/' + id);
              dispatch(getCatList());
       } catch (error) {
              console.log('error loadUser', error);
       }
};
