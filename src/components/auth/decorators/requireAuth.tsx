import React from 'react';
import { Redirect } from 'react-router-dom';
import { Keys, lsGet } from '../../utils/localstorage';

interface IProps {
  authenticated?: boolean;
}

const requireAuth = (Wrapped: any) => {
  class RequireAuth extends React.Component<IProps, {}> {
    isAuthenticated = () => {
      const token = lsGet(Keys.TOKEN);
      return !!token;
    };

    public render() {
      return this.isAuthenticated() ? (
        <Wrapped {...this.props} />
      ) : (
        <Redirect to="/login" />
      );
    }
  }

  return RequireAuth;
};

export default requireAuth;
