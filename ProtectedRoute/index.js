import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PAGE_HOME } from '../../constants';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector(state => state.user);

  return <Route {...rest} render={props => (currentUser?.email ? <Component {...props} /> : <Redirect to={PAGE_HOME} />)} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default ProtectedRoute;
