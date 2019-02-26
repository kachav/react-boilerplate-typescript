import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import api from './api';
import { ApplicationRootState } from 'types';

interface Repository {
  readonly id: number;
  readonly name: string;
  readonly fullName: string;
  readonly private: boolean;
}

/* --- STATE --- */

interface HomeState {
  readonly username: string;
  readonly loading: boolean;
  readonly error: object | boolean;
  readonly repositories: Repository[];
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

export type RootState = ApplicationRootState;
export type ContainerState = HomeState;
export type ContainerActions = AppActions;
export type Api = typeof api;
