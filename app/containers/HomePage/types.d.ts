import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { Observable } from 'rxjs/internal/Observable';

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

type FetchGithub = (id: string) => Observable<Repository[]>;

/* --- EXPORTS --- */

export type RootState = ApplicationRootState;
export type ContainerState = HomeState;
export type ContainerActions = AppActions;
export interface Api {
  readonly fetchGithub: (id: string) => Observable<Repository[]>;
}
