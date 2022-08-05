import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

import { actions as contactActions } from '../../reducers/contact';
import ScrollToTop from '../ScrollToTop';
import { callToastError } from '../../utils/callToast';
import { str2bool } from '../../utils/formatToBoolean';

import { TYPE_CURTOM_COURSES, TYPE_LMS, TYPE_PLATAFORM_CREDITS, TYPE_UNDEFINED } from '../../constants';

const INITIAL_STATE = {
  name: '',
  company: '',
  position: '',
  email: '',
  phone: '',
  pipeline: ''
};

const FormCompany = ({ modelType, setModelType }) => {
  const dispatch = useDispatch();
  const [formContact, setFormContact] = useState(INITIAL_STATE);
  const [dynamicForm, setDynamicForm] = useState({});
  const [errors, setErrors] = useState(null);

  const successContact = useSelector(state => state?.contact?.responseContact);

  // useEffect(() => {
  //   const onSuccessSubmit = () => {
  //     if (successContact) {
  //       callToastSuccess(successContact);
  //     }
  //   };
  //   onSuccessSubmit();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [successContact]);

  useEffect(() => {
    document.getElementById('select-model-type').value = modelType;
    handleInputChange('pipeline', Number(modelType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelType]);

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
    const { name, email, company, pipeline, phone, position } = formContact;

    const { lms, message, employees } = dynamicForm;

    if (!name) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    }
    if (!company) {
      newErrors.company = 'Empresa é obrigatório';
    }
    if (!phone) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    if (!position) {
      newErrors.position = 'Cargo é obrigatório';
    }
    if (email && !isEmail(email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!pipeline) {
      newErrors.pipeline = 'Produto é obrigatório';
    }
    switch (Number(modelType)) {
      case TYPE_LMS:
        if (employees < 0 || typeof employees == 'undefined') {
          newErrors.employees = 'Número de funcionários é obrigatório';
        }
        if (lms === '' || typeof lms == 'undefined') {
          newErrors.lms = 'LMS é obrigatório';
        }
        break;
      case TYPE_PLATAFORM_CREDITS:
        // if (!creditsAmount) {
        //   newErrors.creditsAmount = 'Quantidade de créditos é obrigatória';
        // }
        break;
      case TYPE_CURTOM_COURSES:
        if (!message) {
          newErrors.message = 'Mensagem é obrigatória';
        }
        break;
      default:
        break;
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
    dispatch(contactActions.request({ ...formContact, ...dynamicForm, pipedrive: true }));
    setFormContact({ ...INITIAL_STATE });
    setDynamicForm({});
    setModelType(0);
  };

  const handleSelectModelType = type => {
    setModelType(type);
    setDynamicForm({});
  };

  const renderDynamicFields = () => {
    // eslint-disable-next-line
    switch (Number(modelType)) {
      case TYPE_LMS:
        return (
          <>
            <input
              type="number"
              min={0}
              placeholder="Número de funcionários"
              className={classNames('input-box-number', { invalid: errors?.employees })}
              value={formContact.employees}
              onChange={e => setDynamicForm({ ...dynamicForm, employees: Number(e.currentTarget.value) })}
            />
            {errors?.employees && <span className="feedback-invalid">{errors?.employees}</span>}

            <select
              defaultValue={''}
              onChange={e => setDynamicForm({ ...dynamicForm, lms: str2bool(e.target.value) })}
              className={classNames('input-box-select', { invalid: errors?.lms })}
            >
              <option value="" disabled>
                A empresa possui LMS?
              </option>
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </select>
            {errors?.lms && <span className="feedback-invalid">{errors?.lms}</span>}
            <textarea
              className={'input-box-2'}
              name="message"
              placeholder="Mensagem"
              value={formContact.message}
              onChange={e => setDynamicForm({ ...dynamicForm, message: e.currentTarget.value })}
            />
          </>
        );

      case TYPE_PLATAFORM_CREDITS:
        return (
          <>
            <input
              type="number"
              min={1}
              placeholder="Quantidade de créditos"
              className={classNames('input-box-number', { invalid: errors?.creditsAmount })}
              value={formContact.creditsAmount}
              onChange={e => setDynamicForm({ ...dynamicForm, creditsAmount: Number(e.currentTarget.value) })}
            />
            {errors?.creditsAmount && <span className="feedback-invalid">{errors?.creditsAmount}</span>}
            <textarea
              className={'input-box-2'}
              name="message"
              placeholder="Mensagem"
              value={formContact.message}
              onChange={e => setDynamicForm({ ...dynamicForm, message: e.currentTarget.value })}
            />
          </>
        );

      case TYPE_CURTOM_COURSES:
        return (
          <>
            <textarea
              className={classNames('input-box-2', { invalid: errors?.message })}
              name="message"
              placeholder="Mensagem"
              value={formContact.message}
              onChange={e => setDynamicForm({ ...dynamicForm, message: e.currentTarget.value })}
            />
            {errors?.message && <span className="feedback-invalid">{errors?.message}</span>}
          </>
        );
      case TYPE_UNDEFINED:
        return (
          <>
            <input
              type="number"
              min={0}
              placeholder="Número de funcionários"
              className={'input-box-number'}
              value={formContact.employees}
              onChange={e => setDynamicForm({ ...dynamicForm, employees: Number(e.currentTarget.value) })}
            />

            <select
              defaultValue={''}
              onChange={e => setDynamicForm({ ...dynamicForm, lms: str2bool(e.target.value) })}
              className={'input-box-select'}
            >
              <option value="" disabled>
                A empresa possui LMS?
              </option>
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </select>

            <textarea
              className={'input-box-2'}
              name="message"
              placeholder="Mensagem"
              value={formContact.message}
              onChange={e => setDynamicForm({ ...dynamicForm, message: e.currentTarget.value })}
            />
          </>
        );
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="main">
        <div className="container">
          <div className="row">
            <input
              type="text"
              placeholder="Nome Completo"
              maxLength="255"
              className={classNames('input-box-2', { invalid: errors?.name })}
              value={formContact.name}
              onChange={e => handleInputChange('name', e.currentTarget.value)}
            />
            {errors?.name && <span className="feedback-invalid">{errors?.name}</span>}
            <>
              <input
                type="text"
                placeholder="Empresa"
                maxLength="255"
                className={classNames('input-box-2', { invalid: errors?.company })}
                value={formContact.company}
                onChange={e => handleInputChange('company', e.currentTarget.value)}
              />
              {errors?.company && <span className="feedback-invalid">{errors?.company}</span>}
            </>
            <input
              type="text"
              placeholder="Cargo"
              maxLength="255"
              className={classNames('input-box-2', { invalid: errors?.position })}
              value={formContact.position}
              onChange={e => handleInputChange('position', e.currentTarget.value)}
            />
            {errors?.position && <span className="feedback-invalid">{errors?.position}</span>}
            <input
              type="email"
              placeholder="E-mail corporativo"
              maxLength="255"
              className={classNames('input-box-2', { invalid: errors?.email })}
              value={formContact.email}
              onChange={e => handleInputChange('email', e.currentTarget.value)}
            />
            {errors?.email && <span className="feedback-invalid">{errors?.email}</span>}
            <InputMask
              mask={formContact.phone.length <= 10 ? '(99) 9999-9999?' : '(99) 99999-9999'}
              formatChars={{ 9: '[0-9]', '?': '[0-9 ]' }}
              placeholder="Telefone"
              type="tel"
              className="input-box-2"
              value={formContact.phone}
              maskChar={null}
              onChange={e => handleInputChangeMask(e.currentTarget.value)}
            />
            {errors?.phone && <span className="feedback-invalid">{errors?.phone}</span>}
            <select
              id="select-model-type"
              defaultValue={'1'}
              onChange={e => {
                handleSelectModelType(e.target.value);
              }}
              className={classNames('input-box-select', { invalid: errors?.pipeline })}
            >
              <option value={0} disabled>
                Produto de interesse
              </option>
              <option value={TYPE_LMS}>Plataformas Corporativas (LMS)</option>
              <option value={TYPE_PLATAFORM_CREDITS}>Créditos plataforma Descola</option>
              <option value={TYPE_CURTOM_COURSES}>Cursos Personalizados (sob demanda)</option>
              <option value={TYPE_UNDEFINED}>Ainda não sei qual produto</option>
            </select>
            {errors?.pipeline && <span className="feedback-invalid">{errors?.pipeline}</span>}
            {renderDynamicFields()}

            <div className="box-btn-submit">
              <button className="btn btn-lg btn-secondary" onClick={onHandleContact}>
                Enviar
              </button>
            </div>
          </div>

          {successContact && <div className="col-12 d-flex justify-content-end feedback-valid">{successContact}</div>}
        </div>
      </div>
    </>
  );
};

FormCompany.propTypes = {
  modelType: PropTypes.string
};

FormCompany.defaultProps = {
  modelType: ''
};

export default FormCompany;
