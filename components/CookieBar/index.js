import React, { useState, useEffect } from 'react';
import { COOKIE_BAR_LOCALSTORAGE_KEY } from '../../constants';

const CookieBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cookieBarWasClosed = localStorage.getItem(COOKIE_BAR_LOCALSTORAGE_KEY);
    let cookieBarIsVisible = true;
    if (cookieBarWasClosed === 'true') {
      cookieBarIsVisible = false;
    }
    setVisible(cookieBarIsVisible);
  }, []);

  const handleClick = () => {
    localStorage.setItem(COOKIE_BAR_LOCALSTORAGE_KEY, true);
    setVisible(false);
  };

  return (
    visible && (
      <div className="fixed-bottom cookie-bar orange d-flex align-items-center">
        <div className="container">
          <div className="row cookie-bar-row">
            <div className="col-md-10 text-justify cookie-bar-text">
              Utilizamos cookies para que o nosso site funcione. Acesse a nossa <a href="/politica-de-privacidade">Política de Privacidade</a> e <a href="/politica-de-cookies">Política de Cookies</a> para
              mais informações.
            </div>
            <div className="col-md-2">
              <button className="btn btn-secondary cookie-bar-button" onClick={handleClick}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieBar;
