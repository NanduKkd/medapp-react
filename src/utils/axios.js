import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/doctor'
axios.defaults.validateStatus = () => true

export default axios;
