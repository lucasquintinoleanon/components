import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import yiq from 'yiq';
import classNames from 'classnames';
import useMedia from 'use-media';
import ModalAuth from '../ModalAuth';
import ModalCart from '../ModalCart';
import { actions as userActions } from '../../reducers/user';
import { actions as modalActions } from '../../reducers/modal';
import {
  PAGE_COURSES,
  PAGE_ABOUT,
  PAGE_FOR_COMPANIES,
  PAGE_MY_PROFILE,
  PAGE_MY_COURSES,
  PAGE_MY_FAVORITES,
  PAGE_MY_CERTIFICATES,
  PAGE_MY_PURCHASES,
  AUTH_LOGIN,
  AUTH_REGISTER,
  PAGE_HOME,
  PAGE_SOCIAL_RETURN,
  PAGE_LOGIN,
  BASE_URL_CDN
} from '../../constants';

const logo = `${BASE_URL_CDN}app/assets/images/LOGO.svg`;
const shoppingBag = `${BASE_URL_CDN}app/assets/images/shopping-bag.svg`;
const userIcon = `${BASE_URL_CDN}app/assets/images/user-b.svg`;
const menu = `${BASE_URL_CDN}app/assets/images/menu.svg`;
const lupa = `${BASE_URL_CDN}app/assets/images/lupa.svg`;

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const currentUser = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const [authType, setAuthType] = useState(AUTH_LOGIN);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const setCartModalIsOpen = bool => dispatch(modalActions.setCartModalIsOpen(bool));
  const authModalIsOpen = useSelector(state => state.modal.authModalIsOpen);
  const setAuthModalIsOpen = bool => dispatch(modalActions.setAuthModalIsOpen(bool));

  const openModalAuth = type => {
    setAuthModalIsOpen(true);
    setAuthType(type);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      history.push(`${PAGE_COURSES}?search=${search}`);
    }
  };

  const onHandleLogout = () => {
    setAuthModalIsOpen(false);
    dispatch(userActions.logoutRequest(history));
  };

  const handleMenuClose = () => {
    setMobileMenuIsOpen(false);
  };

  const isMobile = useMedia({ maxWidth: 567 });
  const mobileMenuLock = isMobile && mobileMenuIsOpen;

  useEffect(() => {
    if (mobileMenuLock) {
      window.scrollTo(0, 0);
    }
  }, [mobileMenuLock]);

  useEffect(() => {
    if (pathname === PAGE_SOCIAL_RETURN || pathname === PAGE_LOGIN) {
      return;
    }
    window.dataLayer.push({
      'user': currentUser
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pathname === PAGE_SOCIAL_RETURN || pathname === PAGE_LOGIN) {
    return null;
  }

  return (
    <>
      <ModalAuth authType={authType} setAuthType={setAuthType} />
      <ModalCart setAuthType={setAuthType} />
      <ScrollLock isActive={mobileMenuLock || (authModalIsOpen && !currentUser.email)} />
      <header className={classNames('header', { 'header--inner': currentUser?.email })}>
        <div>
          <Link to={PAGE_HOME} className="logo logo--mobile">
            <img src={logo} alt="Descola Logotipo Mobile" width={60} height={42} />
          </Link>
        </div>
        <button className="btn btn-cart btn--mobile" onClick={() => openModalAuth(AUTH_LOGIN)}>
          <img src={userIcon} alt="Login" width={23} height={27} />
        </button>
        <button className="btn btn-cart btn--mobile" onClick={() => setCartModalIsOpen(true)}>
          <img src={shoppingBag} alt="Sacola de Compras" width={23} height={26} /> <span className="counter">{cart?.products?.length || 0}</span>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-icon dropdown-toggle btn--mobile"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdownMenuButton"
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        >
          <img src={menu} alt="Menu" width={19} height={19} />
        </button>
        <TouchScrollable>
          <div
            className={classNames('dropdown-menu dropdown-menu--header-mob', { show: mobileMenuIsOpen })}
            aria-labelledby="dropdownMenuButton"
          >
            <div
              className="header__user-bar"
              style={{
                backgroundColor: `#${currentUser?.company?.color}`,
                color: yiq(`#${currentUser?.company?.color || 'fc4303'}`, { black: '#212529' })
              }}
            >
              <div className="container ">
                <div className="row">
                  {currentUser?.email ? (
                    <>
                      <div className="col-12 col-lg-10 header__user-bar__nav">
                        {currentUser?.company?.title ? <div className="company">{currentUser?.company?.title}</div> : <div />}
                        <nav>
                          <ul>
                            <li>
                              <Link
                                to={PAGE_MY_PROFILE}
                                onClick={handleMenuClose}
                                style={{ color: yiq(`#${currentUser?.company?.color || 'fc4303'}`, { black: '#212529' }) }}
                              >
                                Meu perfil
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={PAGE_MY_COURSES}
                                onClick={handleMenuClose}
                                style={{ color: yiq(`#${currentUser?.company?.color || 'fc4303'}`, { black: '#212529' }) }}
                              >
                                Meus cursos
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={PAGE_MY_FAVORITES}
                                onClick={handleMenuClose}
                                style={{ color: yiq(`#${currentUser?.company?.color || 'fc4303'}`, { black: '#212529' }) }}
                              >
                                Meus favoritos
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={PAGE_MY_CERTIFICATES}
                                onClick={handleMenuClose}
                                style={{ color: yiq(`#${currentUser?.company?.color || 'fc4303'}`, { black: '#212529' }) }}
                              >
                                Certificados
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={PAGE_MY_PURCHASES}
                                onClick={handleMenuClose}
                                style={{ color: yiq(`#${currentUser?.company?.color || 'fc4303'}`, { black: '#212529' }) }}
                              >
                                Minhas compras
                              </Link>
                            </li>
                            {/* <li>
                            <Link to={PAGE_INDICATIONS}>Indicações</Link>
                          </li> */}
                            {/* <li>
                            <Link to={PAGE_SIGNATURE}>Assinatura</Link>
                          </li> */}
                            <li>
                              <button
                                className="btn btn-link"
                                onClick={onHandleLogout}
                                style={{ color: yiq(`#${currentUser?.company?.color || 'fc4303'}`, { black: '#212529' }) }}
                              >
                                Sair
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="col-12 col-lg-2 header__user-bar__profile">
                        <div className="profile-detalis">
                          <div className="profile-detalis__name">{currentUser.firstName}</div>
                          <div>Aluno</div>
                        </div>
                        <div className="profile-img">
                          {!currentUser.fetchingImageProfile && <img src={currentUser.picture} alt="Usuário Atual" />}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="col-12 text-right">
                      <span className="btn-link" onClick={() => openModalAuth(AUTH_LOGIN)}>
                        Login
                      </span>
                      <span style={{ color: '#222222' }}> / </span>
                      <span className="btn-link" onClick={() => openModalAuth(AUTH_REGISTER)}>
                        Registre-se
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="header__navbar">
              <div className="container ">
                <div className="row">
                  <div className="col-12 header__navbar__container">
                    <Link to={PAGE_HOME} className="logo">
                      <img src={logo} alt="Descola Logotipo" width={124} height={87} />
                    </Link>
                    <nav>
                      <ul>
                        <li>
                          <Link to={PAGE_COURSES} onClick={handleMenuClose}>
                            Cursos
                          </Link>
                        </li>
                        <li>
                          <Link to={PAGE_ABOUT} onClick={handleMenuClose}>
                            O Que é a Descola?
                          </Link>
                        </li>
                        <li>
                          <Link to={PAGE_FOR_COMPANIES} onClick={handleMenuClose}>
                            Para empresas
                          </Link>
                        </li>
                        <li>
                          {/* <Link to={PAGE_BLOG}>Blog</Link> */}
                          <a href="https://blog.descola.org/" rel="noopener noreferrer" target="_blank">
                            Blog
                          </a>
                        </li>
                      </ul>
                    </nav>
                    <button className="btn btn-cart" onClick={() => setCartModalIsOpen(true)}>
                      <img src={shoppingBag} alt="Sacola de Compras" width={23} height={26} />{' '}
                      <span className="counter">{cart?.products?.length || 0}</span>
                    </button>
                    <span className="search__bar">
                      <input
                        type="text"
                        placeholder="Procure um curso"
                        onKeyPress={handleKeyPress}
                        onChange={e => setSearch(e.target.value)}
                      />
                      <button className="btn btn-icon" onClick={() => history.push(`${PAGE_COURSES}?search=${search}`)}>
                        <img src={lupa} alt="Pesquisar" width={14} height={17} />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TouchScrollable>
      </header>
    </>
  );
};

export default Header;
