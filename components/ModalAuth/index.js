import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import urljoin from 'url-join';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import Login from './login';
import Register from './register';
import ForgotPassword from './forgotPassword';
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_FORGOT_PASSWORD, BASE_URL_API, BASE_URL_CDN } from '../../constants';
import { actions as modalActions } from '../../reducers/modal';
import { actions as cartActions } from '../../reducers/cart';
import { actions as userActions } from '../../reducers/user';
import { loadState } from '../../utils/statePersistence';

const logo = `${BASE_URL_CDN}app/assets/images/LOGO.svg`;
const facebook = `${BASE_URL_CDN}app/assets/images/loginFacebook.svg`;
const google = `${BASE_URL_CDN}app/assets/images/loginGoogle.svg`;

const ModalAuth = ({ authType, setAuthType }) => {
  const dispatch = useDispatch();
  const authModalIsOpen = useSelector(state => state.modal.authModalIsOpen);
  const setAuthModalIsOpen = bool => dispatch(modalActions.setAuthModalIsOpen(bool));
  const currentUser = useSelector(state => state.user);

  const onHandleSocialLogin = social => {
    const winObj = window.open(urljoin(BASE_URL_API, 'auth', social), '_blank', 'width=800,height=600,status=0,toolbar=0');
    const loop = setInterval(() => {
      if (winObj.closed) {
        clearInterval(loop);
        const user = loadState('user');
        dispatch(userActions.set(user));
        dispatch(modalActions.setAuthModalIsOpen(false));
        dispatch(cartActions.patchRequest(currentUser.id));
      }
    }, 1000);
  };

  const renderAuthType = setAuthType => ({
    [AUTH_LOGIN]: <Login setAuthType={setAuthType} />,
    [AUTH_REGISTER]: <Register />,
    [AUTH_FORGOT_PASSWORD]: <ForgotPassword />
  });

  return (
    <>
      <ScrollLock isActive={false} />
      <div
        className={classNames('popup__overlay', {
          'popup__overlay--hidden': currentUser.email || !authModalIsOpen
        })}
      >
        <div className="popup__background" onClick={() => setAuthModalIsOpen(false)} />
        <TouchScrollable>
          <div
            className={classNames('popup__screen', {
              'popup__screen--singin': authType === AUTH_REGISTER,
              'popup__screen--new-password': authType === AUTH_FORGOT_PASSWORD
            })}
          >
            <div className="arrow__right" onClick={() => setAuthModalIsOpen(false)} />
            <span className="logo">
              <img src={logo} alt="Descola" width={80} height={55} />
            </span>
            {authType !== AUTH_FORGOT_PASSWORD && (
              <>
                <h3 className="mx-min">
                  {authType === AUTH_LOGIN
                    ? 'Faça login com suas informações de cadastro'
                    : 'Cadastre-se para poder assistir aos cursos gratuitos e adquirir cursos pagos em nossa plataforma'}
                </h3>
                <p>Faça login com suas redes sociais</p>
                <button className="btn btn-facebook" onClick={() => onHandleSocialLogin('facebook')}>
                  <img
                    src={facebook}
                    alt={'Facebook login'}
                    loading="lazy"
                    width={'100%'}
                    height={'100%'}
                  />
                  
                </button>
                <button className="btn btn-google"  onClick={() => onHandleSocialLogin('google')}>
                <img
                    src={google}
                    alt={'Google login'}
                    loading="lazy"
                    width={'100%'}
                    height={'100%'}
                  />
                </button>

                <div className="separador__grupo">
                  <p className="separador">
                    <span>ou</span>
                  </p>
                </div>
              </>
            )}

            {renderAuthType(setAuthType)[authType]}
          </div>
        </TouchScrollable>
      </div>
    </>
  );
};

ModalAuth.propTypes = {
  authType: PropTypes.string.isRequired,
  setAuthType: PropTypes.func.isRequired
};

export default ModalAuth;
