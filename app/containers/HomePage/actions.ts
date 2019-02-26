import { createStandardAction } from 'typesafe-actions';
import { Repository } from './types';

import ActionTypes from './constants';

export const changeUsername = createStandardAction(ActionTypes.CHANGE_USERNAME)<string>();

export const loadRepos = createStandardAction(ActionTypes.LOAD_REPOS)();

interface ReposLoadedPayload {
  readonly repos: Repository[];
  readonly username: string;
}

export const reposLoaded = createStandardAction(ActionTypes.LOAD_REPOS_SUCCESS)<ReposLoadedPayload>();

export const repoLoadingError = createStandardAction(ActionTypes.LOAD_REPOS_ERROR)<object>();
