import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://632c18141aabd8373992d871.mockapi.io/',
});