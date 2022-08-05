import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { BASE_URL_CDN } from '../../constants';

const Head = ({ title, description, keywords, image }) => (
  <Helmet>
    <title> {title} | Descola - Aprenda Power Skills com cursos 100% online</title>
    <meta name="description" content={description} data-react-helmet="true" />
    <meta name="keywords" content={keywords} data-react-helmet="true" />
    <meta property="og:type" content="school" data-react-helmet="true" />
    <meta property="og:description" content={description} data-react-helmet="true" />
    <meta property="og:image" content={image} data-react-helmet="true" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title || 'Curso'} | Descola`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} data-react-helmet="true" />
    {window && window.location && window.location.href !== '' ? <link rel="canonical" href={window.location.href} /> : null}
  </Helmet>
);

Head.defaultProps = {
  description:
    'A Descola é uma escola de cursos online com foco nas power skills. Junte-se aos mais de 100.000 alunos que já transformaram suas vidas com novas habilidades!',
  title: 'Descola | Cursos Online',
  keywords: 'descola, cursos, curso online, power skills, soft skills, habilidades, escola online',
  image: `${BASE_URL_CDN}app/images/social-image.jpg`
};

Head.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string
};

export default Head;
