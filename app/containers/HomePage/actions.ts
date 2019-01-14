import { action, ActionType } from 'typesafe-actions';
import { Repository } from './types';

import ActionTypes from './constants';

const actions = {
  changeUsername: (name: string) => action(ActionTypes.CHANGE_USERNAME, name),
  loadRepos: () => action(ActionTypes.LOAD_REPOS),
  reposLoaded: (repos: Repository[], username: string) =>
    action(ActionTypes.LOAD_REPOS_SUCCESS, { repos: repos, username: username }),
  repoLoadingError: (error: object) =>
    action(ActionTypes.LOAD_REPOS_ERROR, error),
};

export const {changeUsername, loadRepos, reposLoaded, repoLoadingError} = actions;

export type Actions = ActionType<typeof actions>;
