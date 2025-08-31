import {routes, get, post, deleted, put} from './index';

export const getNews = () => {
  return get(`${routes.getNews}`);
};

export const getNewsById = (id: any) => {
  return get(`${routes.getNews}/${id}`);
};

export const deleteNewsById = (id: any) => {
  console.log(`${routes.deleteNewsById}/${id}`);

  return deleted(`${routes.deleteNewsById}/${id}`);
};

export const updateNewsById = (id: any, body: any) => {
  return put(`${routes.updateNewsById}/${id}`, {body});
};

export const createNews = (body: any) => {
  return post(`${routes.createNews}`, {body});
};
