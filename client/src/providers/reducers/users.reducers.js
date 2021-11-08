import {USER_GET_ALL } from '../type';

const initialState = {
       userList:null,
};

export default function (state = initialState, action) {
       const { type, payload } = action;

       switch (type) {
              case USER_GET_ALL:
                     return {
                            ...state,
                            userList: payload
                     }
        
              default:
                     return state;
       }
}
