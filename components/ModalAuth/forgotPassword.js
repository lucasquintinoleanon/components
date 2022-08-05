import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as userActions } from '../../reducers/user';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const error = useSelector(state => state.user?.forgotPassword);
  const success = useSelector(state => state.user?.forgotPasswordSuccess);

  const onHandleForgotPassword = () => {
    dispatch(userActions.forgotPasswordRequest({ email }));
  };

  return (
    <>
      <h3>Não tem problema ter esquecido sua senha</h3>

      <p>Coloque o e-mail cadastrado e enviaremos o link de recuperação de senha</p>

      <form action="" className="popup__screen__form">
        <input type="email" placeholder="E-mail" onChange={e => setEmail(e.currentTarget.value)} />
        {error && <span className="feedback-invalid">{error}</span>}
        {success && <span className="feedback-valid">{success}</span>}
        <div className="row btn-login">
          {' '}
          <button type="button" className="btn btn-primary btn-login" onClick={onHandleForgotPassword}>
            Enviar
          </button>{' '}
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
