import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { Epic } from 'redux-observable';

import checkStore from './checkStore';
import { LifeStore } from 'types';

const checkKey = (key: string) =>
  invariant(
    isString(key) && !isEmpty(key),
    '(app/utils...) injectEpic: Expected `key` to be a non empty string',
  );

const checkEpic = (epic: Epic) => {
  invariant(
    isFunction(epic),
    '(app/utils...) injectEpic: Expected a valid epic',
  );
};

export function injectEpicFactory(store: LifeStore, isValid: boolean) {
  return function injectEpic(key: string, epic: Epic, api?: object) {
    if (!isValid) {
      checkStore(store);
    }

    checkKey(key);
    checkEpic(epic);

    if (!Reflect.has(store.injectedEpics, key)) {
      if (Boolean(api)) {
        store.api[key] = api;
      }
      store.injectedEpics[key] = epic;
      store.runEpic(epic);
    }
  };
}

export default function getInjectors(store: LifeStore) {
  checkStore(store);

  return {
    injectEpic: injectEpicFactory(store, true),
  };
}
