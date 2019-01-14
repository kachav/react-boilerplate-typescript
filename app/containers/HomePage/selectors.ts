/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { ApplicationRootState } from 'types';

export const selectHome = (state: ApplicationRootState) => {
  return state.home ? state.home : initialState;
};

export const makeSelectUsername = () =>
  createSelector(selectHome, substate => {
    return substate.username;
  });

export const selectRoute = (state: ApplicationRootState) => {
  return state.router;
};

export const makeSelectUserName = () =>
  createSelector(selectHome, homeState => homeState.username);

export const makeSelectLoading = () =>
  createSelector(selectHome, homeState => homeState.loading);

export const makeSelectError = () =>
  createSelector(selectHome, homeState => homeState.error);

export const makeSelectRepos = () =>
  createSelector(selectHome, homeState =>
    homeState.repositories);

export const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);
