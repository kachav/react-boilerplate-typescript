import { Action, Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { ILanguageProviderProps } from 'containers/LanguageProvider';
import { ContainerState as HomeState, Api as HomeApi } from 'containers/HomePage/types';
import {Epic as ReduxObservableEpic} from 'redux-observable';

export interface LifeStore extends Store<{}> {
  injectedReducers?: any;
  injectedSagas?: any;
  injectedEpics?: any;
  api?: any;
  runEpic(epic: ReduxObservableEpic): any;
  runSaga(saga: () => IterableIterator<any>, args: any): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectEpicParams {
  key: keyof ApplicationRootState;
  epic: ReduxObservableEpic;
  api: object;
}

interface Api {
  home: HomeApi;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly language: ILanguageProviderProps;
  readonly home: HomeState;
  // for testing purposes
  readonly test: any;
}

export interface Dependencies {
  api: Api;
}

export type Epic<A extends Action> = ReduxObservableEpic<A, A, ApplicationRootState, Dependencies>;
