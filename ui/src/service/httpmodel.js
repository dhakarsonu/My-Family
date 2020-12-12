const axios = require('axios');
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

//setting Default Configuration
axios.defaults.baseURL = 'http://localhost:4000';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
        'Authorization' : `Bearer ${window.appConfig && window.appConfig.token ? window.appConfig.token : ""}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : "*"
    };
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

const get = async ({url,params}) =>{
    const options = {
        method: 'GET',
        url,
        params
    };
    return await axios(options);
};

const post = ({url,payload}) =>{
    const options = {
        method: 'POST',
        data: JSON.stringify(payload),
        url,
    };
    return axios(options);
};

const put = async ({url,payload}) =>{
    const options = {
        method: 'PUT',
        data: JSON.stringify(payload),
        url,
    };
    return await axios(options);
};

const validator = {
    email : email =>{
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    },
    password : password =>{
      return /^(?=.*\d)(?=[^\s])(?=.*[a-zA-Z]).{5,63}([^\s])$/.test(password);
    }
};

export {get,post,put,validator}

