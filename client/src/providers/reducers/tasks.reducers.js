import { TASKS_GET_ALL } from '../type';

const initialState = {
       taskList: null,
       selectedTasksList: null,
};

export default function (state = initialState, action) {
       const { type, payload } = action;

       switch (type) {
              case TASKS_GET_ALL:
                     return {
                            ...state,
                            taskList: payload,
                     };
              case 'ARTICLES_GET_BY_USER_ID':
                     return {
                            ...state,
                            selectedTasksList: payload,
                     };

              default:
                     return state;
       }
}
