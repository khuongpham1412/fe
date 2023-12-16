import axios, { AxiosInstance } from "axios";

class Https {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8000/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraHVvbmcxQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiMTIzNDU2Iiwic3RhdHVzIjoxLCJpYXQiOjE3MDI3MTYwNDZ9.lgvzR6dX5w6_fz_ZsseayNbeTRm6Of0VC0HEo3j5QcA`,
      },
    });

    this.instance.interceptors.request.use(
      (request) => {
        // const token = storage.getCache('access_token');
        // request.baseURL = baseUrl;
        // if (request.headers) {
        // request.headers['Content-Type'] = 'x-www-form-urlencoded';
        // request.headers['Content-Type'] = 'application/json';
        // }
        // if (token && useToken) {
        //  axios.defaults.headers.common['Authorization'] = Bearer ${token}
        //   request.headers.Authorization = Bearer ${token};
        // }
        // console.log('REQ: ' + request)
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        // return { data: response?.data, status: response?.data?.status, success: true, test: response }
        // console.log('RES: ' + response.data.data)
        return response;
      },

      (error) => {
        // if (error?.response?.data) {
        //   if (error?.response?.data?.error == 'Unauthorized') {
        //     storage.removeCache('access_token')
        //     window.location.replace('/candidate')
        //   }
        //   throw {
        //     response: error?.response?.data,
        //     success: false
        //   }
        // }
        // throw error
        return Promise.reject(error);
      }
    );

    // if (error.response.status == 400 && error.response.data.status != 'BAD_REQUEST') {
    //   return {
    //     response: { message: error.response.data.message },
    //     success: false,
    //   };
    // }
    // if (error.response.status == 401) {
    //   if (error.response.data.message == 'Username or password is wrong!') {
    //     return {
    //       response: { message: resources.login.failure },
    //       success: false,
    //     };
    //   }
    //   if (error.response.data.message == 'The Access Token has expired!') {
    //     const useRefreshApi = () => useApi(process.env.IDENTITY_API_URL);
    //     const user = api.getCache('user');
    //     const refreshToken = user.refresh_token;
    //     api.removeCache('token');
    //     api.addCache('token', refreshToken);
    //     const getNewToken = async () => {
    //       const res = await useRefreshApi().get(api/token/refresh);
    //       if (res.success == false) return {};
    //       api.removeCache('user');
    //       api.removeCache('token');
    //       api.addCache('user', res.data.data);
    //       api.addCache('token', res.data.data.access_token);
    //       return {
    //         response: { message: resources.auth.reauthorize },
    //         success: false,
    //       };
    //     };
    //     getNewToken();
    //   }
    //   if (error.response.data.message == 'The Refresh Token has expired!') {
    //     api.removeCache('user');
    //     api.removeCache('token');
    //     alert('Session Expired. Please log in again.');
    //     location.reload();
    //   }
    //   return {
    //     response: { message: resources.auth.forbidden },
    //     success: false,
    //   };
    // }
    // if (error.response.status == 403) {
    //   return {
    //     response: { message: resources.auth.forbidden },
    //     success: false,
    //   };
    // }
    // if (error.response.status == 404 && error.response.data.status != 'NOT_FOUND') {
    //   return {
    //     response: { message: resources.generalError },
    //     success: false,
    //   };
    // }
    // if (error.response.status == 409) {
    //   return {
    //     response: { message: error.response.data.message },
    //     success: false,
    //   };
    // }
    // if (error.response.status == 500) {
    //   return {
    //     response: {
    //       message: error.response.data.message || 'Something went wrong in server. Status 500',
    //     },
    //     success: false,
    //   };
    // }
    // // attendance Errors
    // if (error.response.data.status == 'NOT_FOUND') {
    //   return {
    //     response: { message: error.response.data.message },
    //     success: false,
    //   };
    // }
    // if (error.response.data.status == 'BAD_REQUEST') {
    //   return {
    //     response: { message: error.response.data.message },
    //     success: false,
    //   };
    // }
    // if (error.response.data.status == 'REQUESTED_RANGE_NOT_SATISFIABLE') {
    //   return {
    //     response: { message: error.response.data.message },
    //     success: false,
    //   };
  }
}

// const resources = {
//   login: {
//     failure: 'Login failed. Please try again.',
//   },
//   auth: {
//     reauthorize: 'Your session has expired. Please log in again.',
//     forbidden: 'You do not have permission to access this page.',
//   },
//   generalError: 'An error occurred. Please try again later.',
// };

// export const useApi = (baseUrl, useToken = false) => {
//   // const dispatch = useDispatch();
//   axios.interceptors.request.use(
//     (request) => {
//       const token = storage.getCache('access_token');
//       request.baseURL = baseUrl;
//       if (request.headers) {
//         // request.headers['Content-Type'] = 'x-www-form-urlencoded';
//         // request.headers['Content-Type'] = 'application/json';
//       }
//       if (token && useToken) {
//         //  axios.defaults.headers.common['Authorization'] = Bearer ${token}
//         request.headers.Authorization = Bearer ${token};
//       }
//       return request;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axios.interceptors.response.use(
//     function (res) {
//       return { data: res?.data, status: res?.data?.status, success: true };
//     },

//     function (error) {
//       if (error?.response?.data) {
//         if (error?.response?.data?.error == 'Unauthorized') {
//           storage.removeCache('access_token');
//           window.location.replace('/candidate');
//         }
//         throw {
//           response: error?.response?.data,
//           success: false,
//         };
//       }
//       throw error;

//       // if (error.response.status == 400 && error.response.data.status != 'BAD_REQUEST') {
//       //   return {
//       //     response: { message: error.response.data.message },
//       //     success: false,
//       //   };
//       // }
//       // if (error.response.status == 401) {
//       //   if (error.response.data.message == 'Username or password is wrong!') {
//       //     return {
//       //       response: { message: resources.login.failure },
//       //       success: false,
//       //     };
//       //   }
//       //   if (error.response.data.message == 'The Access Token has expired!') {
//       //     const useRefreshApi = () => useApi(process.env.IDENTITY_API_URL);
//       //     const user = api.getCache('user');
//       //     const refreshToken = user.refresh_token;
//       //     api.removeCache('token');
//       //     api.addCache('token', refreshToken);
//       //     const getNewToken = async () => {
//       //       const res = await useRefreshApi().get(api/token/refresh);
//       //       if (res.success == false) return {};
//       //       api.removeCache('user');
//       //       api.removeCache('token');
//       //       api.addCache('user', res.data.data);
//       //       api.addCache('token', res.data.data.access_token);
//       //       return {
//       //         response: { message: resources.auth.reauthorize },
//       //         success: false,
//       //       };
//       //     };
//       //     getNewToken();
//       //   }
//       //   if (error.response.data.message == 'The Refresh Token has expired!') {
//       //     api.removeCache('user');
//       //     api.removeCache('token');
//       //     alert('Session Expired. Please log in again.');
//       //     location.reload();
//       //   }
//       //   return {
//       //     response: { message: resources.auth.forbidden },
//       //     success: false,
//       //   };
//       // }
//       // if (error.response.status == 403) {
//       //   return {
//       //     response: { message: resources.auth.forbidden },
//       //     success: false,
//       //   };
//       // }
//       // if (error.response.status == 404 && error.response.data.status != 'NOT_FOUND') {
//       //   return {
//       //     response: { message: resources.generalError },
//       //     success: false,
//       //   };
//       // }
//       // if (error.response.status == 409) {
//       //   return {
//       //     response: { message: error.response.data.message },
//       //     success: false,
//       //   };
//       // }
//       // if (error.response.status == 500) {
//       //   return {
//       //     response: {
//       //       message: error.response.data.message || 'Something went wrong in server. Status 500',
//       //     },
//       //     success: false,
//       //   };
//       // }
//       // // attendance Errors
//       // if (error.response.data.status == 'NOT_FOUND') {
//       //   return {
//       //     response: { message: error.response.data.message },
//       //     success: false,
//       //   };
//       // }
//       // if (error.response.data.status == 'BAD_REQUEST') {
//       //   return {
//       //     response: { message: error.response.data.message },
//       //     success: false,
//       //   };
//       // }
//       // if (error.response.data.status == 'REQUESTED_RANGE_NOT_SATISFIABLE') {
//       //   return {
//       //     response: { message: error.response.data.message },
//       //     success: false,
//       //   };
//       // }

//       return Promise.reject(error);
//     }
//   );

//   return axios;
// };

const https = new Https().instance;

export default https;
