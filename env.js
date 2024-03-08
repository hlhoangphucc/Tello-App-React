import axios from 'axios';

axios.defaults.baseURL = 'https://tello-server-django.onrender.com/api';
// axios.defaults.baseURL = 'http://10.0.3.2:8000/api';
// axios.defaults.headers.post['Content-Type'] = 'applcation/json';

export default axios;
