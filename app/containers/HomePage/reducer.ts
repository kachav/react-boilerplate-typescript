import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

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
    case ActionTypes.CHANGE_USERNAME:
      return {
        ...state,
        // Delete prefixed '@' from the github username
        username: action.payload.replace(/@/gi, ''),
      };
    case ActionTypes.LOAD_REPOS:
      return {
        ...state,
        loading: true,
        error: false,
        repositories: [],
      };
    case ActionTypes.LOAD_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: state.error,
        repositories: action.payload.repos,
      };
    case ActionTypes.LOAD_REPOS_ERROR:
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
