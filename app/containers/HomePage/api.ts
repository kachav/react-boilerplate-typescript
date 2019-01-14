import { ajax } from 'rxjs/ajax';
import { Api } from './types';

export const api: Api = {
  fetchGithub: (id) =>
    ajax.getJSON(`https://api.github.com/users/${id}/repos?type=all&sort=updated`),
};

export default api;

export type Api = typeof api;
