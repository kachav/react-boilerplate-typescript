import {getType} from 'typesafe-actions';

import { ContainerState, ContainerActions } from './types';
import * as actions from './actions';

// The initial state of the App
export const initialState: ContainerState = {
  username: '',
  loading: false,
  error: false,
  repositories: [],
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function homeReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case getType(actions.changeUsername):
      return {
        ...state,
        // Delete prefixed '@' from the github username
        username: action.payload.replace(/@/gi, ''),
      };
    case getType(actions.loadRepos):
      return {
        ...state,
        loading: true,
        error: false,
        repositories: [],
      };
    case getType(actions.reposLoaded):
      return {
        ...state,
        loading: false,
        error: state.error,
        repositories: action.payload.repos,
      };
    case getType(actions.repoLoadingError):
      const { error, loading, ...rest } = state;
      return {
        error: action.payload,
        loading: false,
        ...rest,
      };
    default:
      return state;
  }
}

export default homeReducer;
