import axios from 'axios';


const privateApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
    'Content-Type': 'application/json'
    }
});


privateApi.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


privateApi.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('customerId');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});


export default privateApi;