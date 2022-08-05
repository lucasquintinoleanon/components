import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { actions as userActions } from '../../reducers/user';
import { jsonFormatPasswordReset } from '../../api/users';
import { BASE_URL_CDN } from '../../constants';

const logo = `${BASE_URL_CDN}app/assets/images/LOGO.svg`;

const ModalPassword = ({ token, setResetPasswordModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.user);
  const [formResetPassword, setFormResetPassword] = useState({
    password: '',
    passwordConfirmation: ''
  });
  const [errorPassword, setErrorPassword] = useState('');

  useEffect(() => {
    const onLoadPage = () => {
      dispatch(userActions.tokenValidityRequest({ token }));
    };
    onLoadPage();
  }, [dispatch, token]);

  useEffect(() => {
    const onLoadCurrentUser = () => {
      setFormResetPassword({
        ...formResetPassword,
        token: currentUser.tokenValidity?.token,
        email: currentUser.tokenValidity?.email
      });
    };
    onLoadCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleInputChange = (name, value) => {
    setFormResetPassword({ ...formResetPassword, [name]: value });
  };

  const onHandleResetPassword = () => {
    setErrorPassword('');
    const { password, passwordConfirmation } = formResetPassword;
    if (password.length < 6) {
      setErrorPassword('Senha tem que conter no mínimo 6 caracteres.');
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorPassword('As senhas não são iguais.');
      return;
    }
    dispatch(userActions.resetPasswordRequest(jsonFormatPasswordReset(formResetPassword)));
  };

  const onHandleCloseModal = () => {
    setResetPasswordModal(false);
    history.push('/');
  };

  return (
    <div className="popup__overlay popup__overlay--top-zero">
      <div className="popup__box">
        <button className="btn btn-remove" onClick={onHandleCloseModal}>
          close
        </button>
        <span className="logo">
          <img src={logo} alt="Descola" width={80} height={55} />
        </span>
        {currentUser.tokenValidity?.error || (
          <>
            {!currentUser.tokenValidity?.success && (
              <>
                <h3 className="primary">Crie sua nova senha aqui</h3>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  maxLength="255"
                  placeholder="Digite aqui a sua nova senha"
                  onChange={e => handleInputChange('password', e.currentTarget.value)}
                />
                <input
                  type="password"
                  id="confirme"
                  name="confirme"
                  maxLength="255"
                  placeholder="Confirme a sua nova senha"
                  onChange={e => handleInputChange('passwordConfirmation', e.currentTarget.value)}
                />
              </>
            )}
            <div className="col-12 feedback-invalid">{errorPassword}</div>
            <div className="col-12 text-p">{currentUser.tokenValidity?.success}</div>
            {!currentUser.tokenValidity?.success && (
              <div className="buttons-bar">
                <button className="btn btn-primary" onClick={onHandleResetPassword}>
                  Redefinir
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

ModalPassword.propTypes = {
  token: PropTypes.string.isRequired,
  setResetPasswordModal: PropTypes.func.isRequired
};

export default ModalPassword;
