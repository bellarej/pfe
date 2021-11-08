import axios from 'axios';
var baseURL = 'http://localhost:5200';
function IsJsonString(str) {
       try {
              JSON.parse(str);
       } catch (e) {
              return false;
       }
       return true;
}
const API = axios.create({
       baseURL: baseURL + '/v1',
       headers: {
              'Content-Type': 'application/json',
       },
});
API.interceptors.request.use(
       (config) => {
              const token = localStorage.getItem('access_token');
              if (token) {
                     config.headers['Authorization'] = 'Bearer ' + token;
              }
              return config;
       },
       (error) => {
              return Promise.reject(error);
       },
);
API.interceptors.response.use(
       (res) => res.data,
       async (err) => {
              if (err.response.data.error === 'Unauthorized') {
                     /*  store.dispatch({ type: USER_LOGOUT }) */
              }
              const originalConfig = err.config;
              const refreshToken = localStorage.getItem('refresh_token');
              if (originalConfig.url !== '/auth/login' && err.response) {
                     // Access Token was expired
                     if (err.response.status === 401 && !originalConfig._retry) {
                            originalConfig._retry = true;

                            try {
                                   const rs = await API.post('/auth/refresh-tokens', {
                                          refreshToken,
                                   });

                                   const { access, refresh } = rs.data;

                                   localStorage.setItem('access_token', access.token);
                                   localStorage.setItem('refresh_token', refresh.token);
                                   return API(originalConfig);
                            } catch (_error) {
                                   return Promise.reject(_error);
                            }
                     }
              }

              return Promise.reject(
                     IsJsonString(err?.response?.data?.message) ? JSON.parse(err?.response?.data?.message) : err?.response?.data?.message,
              );
       },
);

export default API;
