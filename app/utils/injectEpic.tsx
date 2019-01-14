import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './epicInjectors';
import { InjectEpicParams } from 'types';

/**
 * Dynamically injects a epic
 *
 * @param {string} key A key of the saga
 * @param {function} epic A root epic that will be injected
 *
 */

export default function hocWithSaga<P>({ key, epic, api }: InjectEpicParams) {
  function wrap(
    WrappedComponent: React.ComponentType<P>,
  ): React.ComponentType<P> {
    // dont wanna give access to HOC. Child only
    class InjectEpic extends React.Component<P> {
      public static contextTypes = {
        store: PropTypes.object.isRequired,
      };
      public static displayName = `withEpic(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component'})`;

      public componentWillMount() {
        const { injectEpic } = this.injectors;

        injectEpic(key, epic, api);
      }

      public injectors = getInjectors(this.context.store);

      public render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(InjectEpic, WrappedComponent) as any;
  }
  return wrap;
}
