import { ofType } from 'redux-observable';
import { map, withLatestFrom, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { makeSelectUsername } from 'containers/HomePage/selectors';
import {Epic} from 'types';

import ActionTypes from './constants';
import {reposLoaded, repoLoadingError, Actions} from './actions';

const selectUserName = makeSelectUsername();

export const getRepos: Epic<Actions> = (
  action$,
  state$,
  {api},
) => {
  const userName$ = state$.pipe(map(selectUserName));

  return action$.pipe(
    ofType(ActionTypes.LOAD_REPOS),
    withLatestFrom(userName$),
    switchMap(([action, username]) =>
      api.home.fetchGithub(username).pipe(
        map(repos => reposLoaded(repos, username)),
        catchError(err => of(repoLoadingError(err))),
      ),
    ),
  );
};

export default getRepos;
