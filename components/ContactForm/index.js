import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

import { actions as contactActions } from '../../reducers/contact';
import ScrollToTop from '../ScrollToTop';
import { callToastError, callToastSuccess } from '../../utils/callToast';
import { PAGE_HELP, BASE_URL_CDN, PAGE_FOR_COMPANIES } from '../../constants';

const contato = `${BASE_URL_CDN}app/assets/images/contato.png`;
const imprensa = `${BASE_URL_CDN}app/assets/images/imprensa.png`;

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  company: '',
  message: ''
};

const ContactForm = ({ isCompany, isPressOffice }) => {
  const dispatch = useDispatch();
  const [formContact, setFormContact] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(null);
  const [forMyCompany, setForMyCompany] = useState(false);
  const successContact = useSelector(state => state?.contact?.responseContact);

  useEffect(() => {
    const onLoadPage = () => {
      if (isCompany) {
        setForMyCompany(true);
      }
    };
    onLoadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onSuccessSubmit = () => {
      if (successContact) {
        callToastSuccess(successContact);
      }
    };
    onSuccessSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successContact]);

  const handleInputChange = (name, value) => {
    setFormContact({ ...formContact, [name]: value });
  };

  const handleInputChangeMask = value => {
    const phone = value.replace(/[^0-9]+/g, '');
    setFormContact({ ...formContact, phone });
  };

  const handleValidate = () => {
    const newErrors = {};
    let hasErrors = false;
    const { name, email, message, company } = formContact;
    if (!name) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    }
    if (!message) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    if (!company && forMyCompany) {
      newErrors.company = 'Empresa é obrigatório';
    }
    if (email && !isEmail(email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (Object.keys(newErrors).length) {
      hasErrors = true;
    }

    return { hasErrors, errors: newErrors };
  };

  const onHandleContact = () => {
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
    dispatch(contactActions.request({ ...formContact, pipedrive: false }));
    setFormContact({ ...INITIAL_STATE });
  };

  return (
    <>
      <ScrollToTop />
      <div className="main">
        <div className="container">
          <div className="row mb-40">
            {isPressOffice ? (
              <>
                <div className="col-12">
                  <h1>
                    Assessoria de <span className="primary">Imprensa</span>
                  </h1>
                </div>
                <div className="col-12 col-sm-6 d-flex">
                  <div className="m-auto">
                    <h2>Interessado em conhecer mais sobre a Descola? Fale com nossa área de comunicação pelo telefone:</h2>
                    <h3 className="primary s30">(11) 3042-0043</h3>
                    <p>Ou deixe uma mensagem abaixo:</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <img src={imprensa} alt="Assessoria de Imprensa" width={560} height={408} className="img-fluid" />
                </div>
              </>
            ) : (
              <div className="col-12 col-sm-6">
                <h1 style={{ textAlign: 'left' }}>
                  Entre em <span className="primary">Contato</span>
                </h1>
              </div>
            )}
          </div>
          {!isCompany && !isPressOffice && (
            <div className="row mb-40">
              <div className="col-12 col-sm-6">
                <img src={contato} alt="Entre em Contato" width={560} height={399} className="img-fluid mb-2"  />
              </div>
              <div className="col-12 col-sm-6 d-flex">
                <div className="m-auto">
                  <h2>
                    Tem críticas, sugestões, propostas ou ideias para a Descola? Preencha os campos abaixo ou ligue para gente.
                  </h2>
                  <h3 className="primary s30">(11) 3042-0043</h3>
                  <p>
                    Se você está com dúvidas, dê uma olhada no nosso{' '}
                    <strong className="primary">
                      <Link to={PAGE_HELP}>FAQ</Link>
                    </strong>
                    , pode te ajudar ; &#41;
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-6">
              {/* {!isPressOffice && (
                <div className="mb-15 text-left">
                  <span className="checkbox-tag">
                    <input
                      type="radio"
                      name="me-or-company"
                      id="me"
                      checked={!forMyCompany}
                      onChange={() => setForMyCompany(false)}
                    />
                    <label htmlFor="me">Para mim</label>
                  </span>
                  <span className="checkbox-tag">
                    <input
                      type="radio"
                      name="me-or-company"
                      id="company"
                      checked={forMyCompany}
                      onChange={() => setForMyCompany(true)}
                    />
                    <label htmlFor="company">Para minha empresa</label>
                  </span>
                </div>
              )} */}
              {!isPressOffice && (
                <div className="mb-15 text-left">
                  <span className="checkbox-tag">
                    <span className="me">Para mim</span>
                  </span>
                  <span className="checkbox-tag">
                    <span className="link">
                      <Link to={PAGE_FOR_COMPANIES}>Para minha empresa</Link>
                    </span>
                  </span>
                </div>
              )}
              <input
                type="text"
                placeholder="Nome"
                maxLength="255"
                className={classNames('input-box', { invalid: errors?.name })}
                value={formContact.name}
                onChange={e => handleInputChange('name', e.currentTarget.value)}
              />
              {errors?.name && <span className="feedback-invalid">{errors?.name}</span>}
              {forMyCompany && (
                <>
                  <input
                    type="text"
                    placeholder="Empresa"
                    maxLength="255"
                    className={classNames('input-box', { invalid: errors?.company })}
                    value={formContact.company}
                    onChange={e => handleInputChange('company', e.currentTarget.value)}
                  />
                  {errors?.company && <span className="feedback-invalid">{errors?.company}</span>}
                </>
              )}
              <input
                type="email"
                placeholder="E-mail"
                maxLength="255"
                className={classNames('input-box', { invalid: errors?.email })}
                value={formContact.email}
                onChange={e => handleInputChange('email', e.currentTarget.value)}
              />
              {errors?.email && <span className="feedback-invalid">{errors?.email}</span>}
              <InputMask
                mask={formContact.phone.length <= 10 ? '(99) 9999-9999?' : '(99) 99999-9999'}
                formatChars={{ 9: '[0-9]', '?': '[0-9 ]' }}
                placeholder="Telefone"
                type="tel"
                className="input-box"
                value={formContact.phone}
                maskChar={null}
                onChange={e => handleInputChangeMask(e.currentTarget.value)}
              />
              <input
                type="text"
                placeholder="Assunto"
                maxLength="255"
                className="input-box"
                value={formContact.subject}
                onChange={e => handleInputChange('subject', e.currentTarget.value)}
              />
            </div>
            <div className="col-md-6">
              <textarea
                className={classNames('input-box', { invalid: errors?.message })}
                name="message"
                placeholder="Mensagem"
                value={formContact.message}
                onChange={e => handleInputChange('message', e.currentTarget.value)}
              />
              {errors?.message && <span className="feedback-invalid">{errors?.message}</span>}
            </div>
            {successContact && <div className="col-12 d-flex justify-content-end feedback-valid">{successContact}</div>}
            <div className="col-12 box-btn-submit">
              <button className="btn btn-lg btn-dark" onClick={onHandleContact}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ContactForm.propTypes = {
  isCompany: PropTypes.bool,
  isPressOffice: PropTypes.bool
};

ContactForm.defaultProps = {
  isCompany: false,
  isPressOffice: false
};

export default ContactForm;
