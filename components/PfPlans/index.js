import React from 'react';
import { useDispatch } from 'react-redux';

import { actions as modalActions } from '../../reducers/modal';
import { actions as cartActions } from '../../reducers/cart';
import { CREDITS_ID_ALL, CREDITS_ID_5, CREDITS_ID_10, CREDITS_ID_20 } from '../../constants';

const Plans = () => {
  const dispatch = useDispatch();
  const setCartModalIsOpen = bool => dispatch(modalActions.setCartModalIsOpen(bool));
  const handleBuyCredits = (id, position, list) => {
    setCartModalIsOpen(true);
    dispatch(cartActions.addRequest({ id, position, list }));
  };
  const year = new Date().getFullYear();

  function pfModal(n) {
    const modal = document.getElementsByClassName('pf-card-modal');

    const workModal = modal[n];
    workModal.classList.toggle('active');

    window.onclick = function (event) {
      if (event.target === workModal) {
        workModal.classList.toggle('active');
      }
    };
  }

  return (
    <div id="pf-plans" className="row d-flex justify-content-between align-items-center pf-cards">
      <div className="col-6 col-lg-3">
        <div className="pf-card my-4 py-4">
          <span className="pf-card-pretitle">PACOTE</span>
          <h2 className="pf-card-title">
            TODOS OS
            <br />
            CURSOS
          </h2>
          <p>
            <span className="btn btn-sm pf-btn-sm pf-btn-blue">90% OFF</span>{' '}
            <span className="btn pf-btn-sm btn-sm pf-btn-blue">+ Popular</span>
          </p>
          <span className="pf-card-offer">de R$14.695,80 por:</span>
          <div className="pf-card-price">
            <p>
              <span>12x de</span>
              <br />
              R$119,00
            </p>
          </div>
          <button
            onClick={() => handleBuyCredits(CREDITS_ID_ALL, 1, `Power Friday ${year} - Tabela de créditos`)}
            className="btn btn-large pf-btn-blue pf-btn"
          >
            COMPRAR!
          </button>
          <button onClick={() => pfModal(0)} className="d-block d-md-none pf-card-link btn btn-dark">
            + DETALHES
          </button>
          <div className="pf-card-modal">
            <ul className="pf-card-modal-content">
              <span onClick={() => pfModal(0)} className="pf-card-modal-close" />
              <li>
                <i className="pf-check-icon" /> 108 cursos disponíveis
              </li>
              <li>
                <i className="pf-check-icon" /> Mais de 200 horas de vídeo aulas
              </li>
              <li>
                <i className="pf-check-icon" /> Mais de 120 professores
              </li>
              <li>
                <i className="pf-check-icon" /> Assista quantas vezes quiser
              </li>
              <li>
                <i className="pf-check-icon" /> Acesso vitalício
              </li>
              <li>
                <i className="pf-check-icon" /> Ebooks com conteúdo adicional
              </li>
              <li>
                <i className="pf-check-icon" /> Ferramentas para download
              </li>
              <li>
                <i className="pf-check-icon" /> Certificados de conclusão digitais
              </li>
              <li>
                <i className="pf-check-icon" /> Grupos de discussão
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3">
        <div className="pf-card my-4 py-4">
          <span className="pf-card-pretitle">PACOTE</span>
          <h2 className="pf-card-title">20 CRÉDITOS</h2>
          <p>
            <span className="btn pf-btn-sm btn-sm pf-btn-blue">50% OFF</span>
          </p>
          <span className="pf-card-offer">de R$1.598,00 por:</span>
          <div className="pf-card-price">
            <p>
              <span>12x de</span>
              <br />
              R$66,58
            </p>
          </div>
          <button
            onClick={() => handleBuyCredits(CREDITS_ID_20, 2, `Power Friday ${year} - Tabela de créditos`)}
            className="btn btn-large pf-btn pf-btn-blue"
          >
            COMPRAR!
          </button>
          <button onClick={() => pfModal(1)} className="d-block d-md-none pf-card-link btn btn-dark">
            + DETALHES
          </button>
          <div className="pf-card-modal">
            <ul className="pf-card-modal-content">
              <span onClick={() => pfModal(1)} className="pf-card-modal-close" />
              <li>
                <i className="pf-check-icon" /> 20 cursos à sua escolha
              </li>
              <li>
                <i className="pf-check-icon" /> Créditos não expiram
              </li>
              <li>
                <i className="pf-check-icon" /> Acesso vitalício aos cursos
              </li>
              <li>
                <i className="pf-check-icon" /> Ebooks com conteúdo adicional
              </li>
              <li>
                <i className="pf-check-icon" /> Ferramentas para download
              </li>
              <li>
                <i className="pf-check-icon" /> Certificados de conclusão digitais
              </li>
              <li>
                <i className="pf-check-icon" /> Grupos de discussão
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3">
        <div className="pf-card my-4 py-4">
          <span className="pf-card-pretitle">PACOTE</span>
          <h2 className="pf-card-title">10 CRÉDITOS</h2>
          <p>
            <span className="btn pf-btn-sm btn-sm pf-btn-blue">50% OFF</span>
          </p>
          <span className="pf-card-offer">de R$999,00 por:</span>
          <div className="pf-card-price">
            <p>
              <span>12x de</span>
              <br />
              R$41,58
            </p>
          </div>
          <button
            onClick={() => handleBuyCredits(CREDITS_ID_10, 3, `Power Friday ${year} - Tabela de créditos`)}
            className="btn btn-large pf-btn pf-btn-blue"
          >
            COMPRAR!
          </button>
          <button onClick={() => pfModal(2)} className="d-block d-md-none pf-card-link btn btn-dark">
            + DETALHES
          </button>
          <div className="pf-card-modal">
            <ul className="pf-card-modal-content">
              <span onClick={() => pfModal(2)} className="pf-card-modal-close" />
              <li>
                <i className="pf-check-icon" /> 10 cursos à sua escolha
              </li>
              <li>
                <i className="pf-check-icon" /> Créditos não expiram
              </li>
              <li>
                <i className="pf-check-icon" /> Acesso vitalício aos cursos
              </li>
              <li>
                <i className="pf-check-icon" /> Ebooks com conteúdo adicional
              </li>
              <li>
                <i className="pf-check-icon" /> Ferramentas para download
              </li>
              <li>
                <i className="pf-check-icon" /> Certificados de conclusão digitais
              </li>
              <li>
                <i className="pf-check-icon" /> Grupos de discussão
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3">
        <div className="pf-card my-4 py-4">
          <span className="pf-card-pretitle">PACOTE</span>
          <h2 className="pf-card-title">5 CRÉDITOS</h2>
          <p>
            <span className="btn pf-btn-sm btn-sm pf-btn-blue">50% OFF</span>
          </p>
          <span className="pf-card-offer">de R$550,00 por:</span>
          <div className="pf-card-price">
            <p>
              <span>12x de</span>
              <br />
              R$22,92
            </p>
          </div>
          <button
            onClick={() => handleBuyCredits(CREDITS_ID_5, 4, `Power Friday ${year} - Tabela de créditos`)}
            className="btn btn-large pf-btn pf-btn-blue"
          >
            COMPRAR!
          </button>
          <button onClick={() => pfModal(3)} className="d-block d-md-none pf-card-link btn btn-dark">
            + DETALHES
          </button>
          <div className="pf-card-modal">
            <ul className="pf-card-modal-content">
              <span onClick={() => pfModal(3)} className="pf-card-modal-close" />
              <li>
                <i className="pf-check-icon" /> 5 cursos à sua escolha
              </li>
              <li>
                <i className="pf-check-icon" /> Créditos não expiram
              </li>
              <li>
                <i className="pf-check-icon" /> Acesso vitalício aos cursos
              </li>
              <li>
                <i className="pf-check-icon" /> Ebooks com conteúdo adicional
              </li>
              <li>
                <i className="pf-check-icon" /> Ferramentas para download
              </li>
              <li>
                <i className="pf-check-icon" /> Certificados de conclusão digitais
              </li>
              <li>
                <i className="pf-check-icon" /> Grupos de discussão
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
