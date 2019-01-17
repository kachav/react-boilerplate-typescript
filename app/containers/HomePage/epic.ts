import { ofType } from 'redux-observable';
import { map, withLatestFrom, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { getType } from 'typesafe-actions';

import { makeSelectUsername } from 'containers/HomePage/selectors';
import {Epic} from 'types';

import {reposLoaded, repoLoadingError, loadRepos} from './actions';
import {ContainerActions} from './types';

const selectUserName = makeSelectUsername();

export const getRepos: Epic<ContainerActions> = (
  action$,
  state$,
  {api},
) => {
  const userName$ = state$.pipe(map(selectUserName));

  return action$.pipe(
    ofType(getType(loadRepos)),
    withLatestFrom(userName$),
    switchMap(([action, username]) =>
      api.home.fetchGithub(username).pipe(
        map(repos => {
          return reposLoaded({repos, username});
        }),
        catchError(err => of(repoLoadingError(err))),
      ),
    ),
  );
};

export default getRepos;
