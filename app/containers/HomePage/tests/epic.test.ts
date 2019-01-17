import {TestScheduler} from 'rxjs/testing';

import getReposEpic from '../epic';
import {loadRepos, reposLoaded, repoLoadingError} from '../actions';

const username = 'testUserName';
const repos = [
  {id: 1, name: 'name', fullName: 'fullname', private: true},
  {id: 2, name: 'name2', fullName: 'fullname2', private: true},
  {id: 3, name: 'name3', fullName: 'fullname3', private: true},
];
const state = {
  home: {
    username,
    loading: true,
    error: false,
    repositories: [],
  },
};

let testScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});

describe('getRepos Epic', () => {
  const fetchGithub = jest.fn();
  const api = {
    home: {
      fetchGithub,
    },
  };

  beforeEach(() => {
    fetchGithub.mockReset();
  });

  it('load repos', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      fetchGithub.mockReturnValue(cold('-a|', {
        a: repos,
      }));
      const loadReposAction = loadRepos();
      const reposLoadedAction = reposLoaded({ username, repos });


      const action$: any = hot('--a', {
        a: loadReposAction,
      });
      const state$: any = hot('-a', {
        a: state,
      });
      const dependencies = { api };

      const output$ = getReposEpic(action$, state$, dependencies);

      expectObservable(output$).toBe('---a', {
        a: reposLoadedAction,
      });
    });
  });

  it('emit error', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const error = {
        CODE: 'test',
      };

      fetchGithub.mockReturnValue(cold('#', null, error));
      const loadReposAction = loadRepos();
      const reposFailedAction = repoLoadingError(error);


      const action$: any = hot('--a', {
        a: loadReposAction,
      });
      const state$: any = hot('-a', {
        a: state,
      });
      const dependencies = { api };

      const output$ = getReposEpic(action$, state$, dependencies);

      expectObservable(output$).toBe('--a', {
        a: reposFailedAction,
      });
    });
  });
});
