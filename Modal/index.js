import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ setModalWarningIsOpen }) => {
  const [aware, setAware] = useState(false);
  const onHandleContinue = () => {
    if (!aware) {
      return;
    }
    setModalWarningIsOpen(false);
  };

  return (
    <div className="popup__overlay">
      <div className="popup__box">
        <h3 className="primary">Aviso importante (Por ora, aparece modal se canWatch é false)</h3>
        <p>
          Para fazer este curso você vai precisar de um Arduino e alguns outros acessórios, descritos na página do curso. Antes de
          comprar, certifique-se que já os possui ou que vai providenciar. Nosso parceiro criou um kit pronto com todos os
          materiais que você vai usar no curso, basta clicar no link abaixo para comprar ; &#41;
        </p>
        <input type="checkbox" id="ciente" name="ciente" value={aware} onChange={() => setAware(!aware)} />
        <label className="primary" htmlFor="ciente">
          Estou ciente que vou precisar de materiais adicionais para acompanhar o curso.
        </label>
        <div className="buttons-bar">
          <button className="btn btn-dark">Comprar Kit</button>
          <button className="btn btn-secondary" onClick={onHandleContinue}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setModalWarningIsOpen: PropTypes.func.isRequired
};

export default Modal;
