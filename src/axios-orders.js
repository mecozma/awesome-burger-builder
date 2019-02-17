import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-47fbf.firebaseio.com'
});

export default instance;