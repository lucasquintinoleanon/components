import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions as blogPostsActions } from '../../reducers/blogPosts';
import { actions as abilitiesActions } from '../../reducers/abilities';
import {
  PAGE_COURSES,
  PAGE_TERMS_AND_CONDITIONS,
  PAGE_COOKIES_POLICY,
  PAGE_PRIVACY_POLICY,
  PAGE_HELP,
  PAGE_FOR_COMPANIES,
  PAGE_CONTACT,
  PAGE_PRESS_OFFICE,
  BASE_URL_CDN
} from '../../constants';

const logoDark = `${BASE_URL_CDN}app/assets/images/logo_dark.svg`;
const linkedIn = `${BASE_URL_CDN}app/assets/images/linkedin.svg`;
const instagram = `${BASE_URL_CDN}app/assets/images/instagram.svg`;
const facebook = `${BASE_URL_CDN}app/assets/images/facebook.svg`;
const headSet = `${BASE_URL_CDN}app/assets/images/headset.svg`;

const Footer = () => {
  const dispatch = useDispatch();
  const blogPosts = useSelector(state => state.blogPosts);
  const footerAbilities = useSelector(state => state.abilities.footer);
  const [mostUsedAbilities, setMostUsedAbilities] = useState([]);
  const NUMBER_ABILITIES = 12;

  useEffect(() => {
    const onLoadPage = () => {
      if (!blogPosts.allIds.length) {
        dispatch(blogPostsActions.getRequest());
      }
      if (!footerAbilities.length) {
        dispatch(abilitiesActions.getAllRequest());
      }
    };
    onLoadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const onLoadFooterAbilities = () => {
      setMostUsedAbilities(footerAbilities.sort((a, b) => b.quantity - a.quantity).slice(0, NUMBER_ABILITIES));
    };
    onLoadFooterAbilities();
  }, [footerAbilities]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-6 col-lg-3">
            <h3>Sobre a escola</h3>
            <p className="about__descola">
              A Descola é uma escola de cursos online que cria grandes experiências de aprendizagem para transformar as pessoas ao
              longo de suas vidas. Selecionamos temas e professores e construímos conteúdos para que você desenvolva Power Skills.
            </p>
            <p>Descola Cursos Inovadores LTDA EPP 17.996.625/0001-58</p>
            <span className="contato__telefone">
              <img className="headset__icon" src={headSet} alt="Telefone" loading="lazy" width={22} height={24} />
              <a href="tel:+551130420043">+55 (11) 3042-0043</a>
            </span>
            <div className="logo">
              <img src={logoDark} alt="Descola Logo Footer" loading="lazy" width={124} height={87} />
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <h3 className="d-none d-md-block">Habilidades em destaque</h3>
            <div className="tags d-none d-md-block">
              {mostUsedAbilities.map(({ id, title, slug }) => (
                <Link key={id} to={`${PAGE_COURSES}?tag=${slug}`} className="btn btn-sm btn-primary">
                  {title}
                </Link>
              ))}
            </div>

            <div className="redes__sociais">
              <h3>Redes sociais</h3>
              <a
                href="https://br.linkedin.com/school/descola"
                className="btn btn-primary btn-icon"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img className="linkedin__icon" src={linkedIn} alt="Linkedin" loading="lazy" width={18} height={18} />
              </a>
              <a
                href="https://www.instagram.com/descolagram"
                className="btn btn-primary btn-icon"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img className="instagram__icon" src={instagram} alt="instagram" loading="lazy" width={16} height={18} />
              </a>
              <a
                href="https://www.facebook.com/descolasp"
                className="btn btn-primary btn-icon"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img className="facebook__icon" src={facebook} alt="facebook" loading="lazy" width={18} height={16} />
              </a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <h3>Blog da escola</h3>
            {blogPosts.allIds.map(id => {
              const blog = blogPosts.byId[id];
              return (
                <a key={id} href={blog.link} className="footer__card" rel="noopener noreferrer" target="_blank">
                  <div className="footer__card__img">
                    <img src={blog?.image} alt={blog?.title ? blog.title : 'Post em Destaque'} loading="lazy" width={76} height={76} />
                  </div>
                  <div className="footer__card__content">
                    <h4>{blog?.title}</h4>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="col-sm-3 col-md-6 col-lg-3">
            <h3>Navegue</h3>
            <nav>
              {' '}
              <ul>
                <li>
                  <Link to={PAGE_COURSES}>Cursos</Link>
                </li>
                <li>
                  <a href="https://blog.descola.org/" rel="noopener noreferrer" target="_blank">
                    Blog
                  </a>
                </li>
                <li>
                  <Link to={PAGE_FOR_COMPANIES}>Para empresas</Link>
                </li>
                <li>
                  <Link to={PAGE_CONTACT}>Contato</Link>
                </li>
                <li>
                  <Link to={PAGE_HELP}>FAQ</Link>
                </li>
                <li>
                  <Link to={PAGE_PRESS_OFFICE}>Imprensa</Link>
                </li>
                <li>
                  <Link to={PAGE_TERMS_AND_CONDITIONS}>Termos de Uso</Link>
                </li>
                <li>
                  <Link to={PAGE_COOKIES_POLICY}>Política de Cookies</Link>
                </li>
                <li>
                  <Link to={PAGE_PRIVACY_POLICY}>Política de Privacidade</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
