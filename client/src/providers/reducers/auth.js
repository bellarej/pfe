import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, CLEAR_AUTH_PROCESS, LOAD_CURRENT_USER } from '../type';

const initialState = {
       process: {
              type: null,
              success: {
                     status: null,
                     data: null,
              },
              fail: {
                     status: null,
                     data: null,
              },
       },
};

export default function (state = initialState, action) {
       const { type, payload } = action;

       switch (type) {
              case LOGIN_SUCCESS:
                     return {
                            ...state,
                            process: {
                                   type: LOGIN_SUCCESS,
                                   success: {
                                          status: true,
                                          data: payload,
                                   },
                                   fail: {
                                          status: null,
                                          data: null,
                                   },
                            },
                     };
              case LOGIN_FAILURE:
                     return {
                            ...state,
                            process: {
                                   type: LOGIN_SUCCESS,
                                   fail: {
                                          status: true,
                                          data: payload,
                                   },
                            },
                     };
              case REGISTER_SUCCESS:
                     return {
                            ...state,
                            process: {
                                   type: REGISTER_SUCCESS,
                                   success: {
                                          status: true,
                                          data: payload,
                                   },
                                   fail: {
                                          status: null,
                                          data: null,
                                   },
                            },
                     };
              case REGISTER_FAILURE:
                     return {
                            ...state,
                            process: {
                                   type: REGISTER_FAILURE,
                                   fail: {
                                          status: true,
                                          data: payload,
                                   },
                            },
                     };
              case CLEAR_AUTH_PROCESS:
                     return {
                            ...state,
                            process: {
                                   type: null,
                                   success: {
                                          status: null,
                                          data: null,
                                   },
                                   fail: {
                                          status: null,
                                          data: null,
                                   },
                            },
                     };
              case LOAD_CURRENT_USER:
                     return {
                            ...state,
                            currentUser: payload,
                     };

              default:
                     return state;
       }
}
