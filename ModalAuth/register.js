import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import isEmail from 'validator/lib/isEmail';
import { actions as userActions } from '../../reducers/user';
import { jsonFormatRegister } from '../../api/users';
import { callToastError } from '../../utils/callToast';

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.user.error);
  const [formRegister, setFormRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    subscription: true,
    agreedTerms: false
  });
  const [formErrorAgreed, setFormErrorAgreed] = useState('');
  const [errors, setErrors] = useState(null);

  const handleInputChange = (name, value) => {
    setFormRegister({ ...formRegister, [name]: value });
  };
  const handleAgreedTerms = () => {
    setFormErrorAgreed('');
    setFormRegister({ ...formRegister, agreedTerms: !formRegister.agreedTerms });
  };

  const handleValidate = () => {
    const newErrors = {};
    let hasErrors = false;
    const { firstName, lastName, email, password, passwordConfirmation, agreedTerms } = formRegister;
    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
      newErrors.formError = 'Favor preencher todos os campos';
    }
    if (!agreedTerms) {
      newErrors.agreedTerms = 'Aceite os termos para continuar o cadastro';
      setFormErrorAgreed('Aceite os termos para continuar o cadastro');
    }
    if (password !== passwordConfirmation) {
      newErrors.password = 'Senhas estão diferentes';
    }
    if (email && !isEmail(email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (Object.keys(newErrors).length) {
      hasErrors = true;
    }

    return { hasErrors, errors: newErrors };
  };

  const onHandleRegister = () => {
    const { hasErrors, errors } = handleValidate();
    if (hasErrors) {
      setErrors(errors);
      // white-space: pre;
      callToastError(
        Object.keys(errors)
          .map(key => `${errors[key]}`)
          .join('\r\n')
      );
      return;
    }
    setErrors(null);
    dispatch(userActions.registerRequest(jsonFormatRegister(formRegister)));
  };

  return (
    <>
      <p>Cadastre-se de maneira convencional:</p>
      <div action="" className="popup__screen__form">
        <input
          type="text"
          placeholder="Nome"
          value={formRegister.firstName}
          maxLength="255"
          onChange={e => handleInputChange('firstName', e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={formRegister.lastName}
          maxLength="255"
          onChange={e => handleInputChange('lastName', e.currentTarget.value)}
        />
        <input
          className={classNames({ invalid: errors?.email || error })}
          type="email"
          placeholder="E-mail"
          value={formRegister.email}
          maxLength="255"
          onChange={e => handleInputChange('email', e.currentTarget.value)}
        />
        {errors?.email && <span className="feedback-invalid">{errors?.email}</span>}
        {error && <span className="feedback-invalid">{error}</span>}
        <input
          className={classNames({ invalid: errors?.password })}
          type="password"
          placeholder="Senha"
          value={formRegister.password}
          maxLength="255"
          onChange={e => handleInputChange('password', e.currentTarget.value)}
        />
        <input
          className={classNames({ invalid: errors?.password })}
          type="password"
          placeholder="Confirme sua senha"
          value={formRegister.passwordConfirmation}
          maxLength="255"
          onChange={e => handleInputChange('passwordConfirmation', e.currentTarget.value)}
        />
        {errors?.password && <span className="feedback-invalid">{errors?.password}</span>}
        {errors?.formError && <span className="feedback-invalid">{errors?.formError}</span>}
        <div>
          <input
            type="checkbox"
            id="atualizacoes"
            name="atualizacoes"
            value={formRegister.subscription}
            onChange={() => handleInputChange('subscription', !formRegister.subscription)}
            checked={formRegister.subscription}
          />
          <label htmlFor="atualizacoes">
            Desejo receber atualizações de cursos da Descola por e-mail <strong>(somos contra spam)</strong>
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="termosUso"
            name="termosUso"
            value={formRegister.agreedTerms}
            onChange={() => handleAgreedTerms('agreedTerms', !formRegister.agreedTerms)}
            checked={formRegister.agreedTerms}
          />
          <label htmlFor="termosUso">Estou de acordo com os termos de uso da Descola</label>
        </div>
        {formErrorAgreed && <span className="feedback-invalid">{formErrorAgreed}</span>}
        <div className="row btn-login">
          <button type="button" className="btn btn-primary btn-login" onClick={onHandleRegister}>
            Entrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
