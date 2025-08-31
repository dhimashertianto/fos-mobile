import {AxiosRequestHeaders} from 'axios';
import apiClient from './api-client';
const BASE_URL = 'http://10.0.2.2:3000';

const contentTypes: any = {
  json: 'application/json',
  mfd: 'multipart/form-data',
};

// Base function for GET requests
const get = (route: string) => {
  return apiClient(`${BASE_URL}/${route}`);
};

// Base function for POST requests
const post = async (
  route: string,
  {body, type = '', user = {}}: {body: any; type: string; user: any},
) => {
  let headers: AxiosRequestHeaders = {Accept: 'application/json'};
  if (user.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }
  if (type !== '') {
    headers['Content-Type'] = contentTypes[type];
  }
  return apiClient({
    method: 'post',
    url: `${BASE_URL}/${route}`,
    headers,
    data: body,
  });
};

const deleted = async (route: string) => {
  let headers: AxiosRequestHeaders = {Accept: 'application/json'};
  return apiClient({
    method: 'delete',
    headers,
    url: `${BASE_URL}/${route}`,
  });
};

const put = async (
  route: string,
  {body, type = '', user = {}}: {body: any; type: string; user: any},
) => {
  let headers: AxiosRequestHeaders = {Accept: 'application/json'};
  if (user.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }
  if (type !== '') {
    headers['Content-Type'] = contentTypes[type];
  }
  return apiClient({
    method: 'put',
    url: `${BASE_URL}/${route}`,
    headers,
    data: body,
  });
};

// Routes
const routes = {
  login: 'login',
  getNews: 'berita',
  getNewsById: 'berita',
  deleteNewsById: 'berita',
  updateNewsById: 'berita',
  createNews: 'berita',
};

export {routes, get, post, deleted, put};

export {login} from './auth';
export {getNews} from './news';
export {getNewsById} from './news';
export {deleteNewsById} from './news';
export {updateNewsById} from './news';
export {createNews} from './news';
