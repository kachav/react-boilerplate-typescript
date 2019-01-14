import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/internal/Observable';

import { Repository } from './types';

export default {
  fetchGithub: (id: string): Observable<Repository[]> =>
    ajax.getJSON(`https://api.github.com/users/${id}/repos?type=all&sort=updated`),
};
