import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { actions as userActions } from '../../reducers/user';
import { jsonFormatLogin } from '../../api/users';
import { callToastError } from '../../utils/callToast';
import { AUTH_REGISTER, AUTH_FORGOT_PASSWORD } from '../../constants';

const Login = ({ setAuthType }) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.user.error);
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const onErrorSubmit = () => {
      if (error) {
        callToastError(error);
      }
    };
    onErrorSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleInputChange = (name, value) => {
    setFormLogin({ ...formLogin, [name]: value });
  };

  const onHandleLogin = () => {
    const { email, password } = formLogin;
    setFormError('');
    if (!email || !password) {
      setFormError('Favor preencher todos os campos');
      callToastError('Favor preencher todos os campos');
      return;
    }
    dispatch(userActions.loginRequest(jsonFormatLogin(formLogin)));
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      onHandleLogin();
    }
  };

  return (
    <form action="" className="popup__screen__form">
      <div className="input-icon icon-user ">
        <input
          className={classNames({ invalid: error })}
          type="text"
          placeholder="E-mail"
          onKeyPress={handleKeyPress}
          onChange={e => handleInputChange('email', e.currentTarget.value)}
        />
      </div>
      <div className="input-icon icon-lock">
        <input
          className={classNames({ invalid: error })}
          type="password"
          placeholder="Senha"
          onKeyPress={handleKeyPress}
          onChange={e => handleInputChange('password', e.currentTarget.value)}
        />
        <span className="password__icon" />
        {error && <span className="feedback-invalid">{error}</span>}
        {formError && <span className="feedback-invalid">{formError}</span>}
      </div>
      <div>
        <input type="checkbox" id="conectado" name="conectado" />
        <label htmlFor="conectado">Permanecer Conectado</label>
      </div>
      <div className="row btn-login">
        <button type="button" className="btn btn-primary btn-login" onClick={onHandleLogin}>
          Entrar
        </button>
      </div>
      <div>
        <p className="text-xxs">
          <button type="button" className="btn btn-link" onClick={() => setAuthType(AUTH_FORGOT_PASSWORD)}>
            Esqueci minha senha
          </button>
        </p>
        <p className="text-xxs">
          <button type="button" className="btn btn-link" onClick={() => setAuthType(AUTH_REGISTER)}>
            Não tem uma conta? <strong>Faça seu cadastro</strong>
          </button>
        </p>
      </div>
    </form>
  );
};

Login.propTypes = {
  setAuthType: PropTypes.func.isRequired
};

export default Login;
