import defaultAxios from 'axios';

const protocol = window.location.protocol;
const corsproxy = protocol === 'http:' ? 'https://cors-anywhere.herokuapp.com/' : '';
export const baseURL = 'https://cbu.uz/';
const axios = defaultAxios.create({ baseURL });

export default axios
