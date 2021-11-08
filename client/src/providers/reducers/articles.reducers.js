import { ARTICLES_GET_ALL } from '../type';

const initialState = {
       articlesList: null,
       catList: null,
};

export default function (state = initialState, action) {
       const { type, payload } = action;

       switch (type) {
              case ARTICLES_GET_ALL:
                     return {
                            ...state,
                            articlesList: payload,
                     };
              case 'CAT_GET_ALL':
                     return {
                            ...state,
                            catList: payload,
                     };

              default:
                     return state;
       }
}
