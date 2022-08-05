import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProtectedRoute from '../ProtectedRoute';
import 'nprogress/nprogress.css';
import './index.css';


const LoaderRoute = props => (props?.protected ? <ProtectedRoute {...props} /> : <Route {...props} />);

LoaderRoute.propTypes = {
  protected: PropTypes.bool
};

LoaderRoute.defaultProps = {
  protected: false
};

export default LoaderRoute;
