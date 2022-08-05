import React, { useState } from 'react';
import '../../styles/preview-img.scss';
import PreviewImageLoader from './loader';

const PreviewImage = ({ urls, setPlay, isForCompanies }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div id={!isForCompanies && 'img_container'}>
      <picture onLoad={() => setLoaded(true)}>
        <source media="(min-width: 60em)" srcSet={`${urls.large2x} 2x, ${urls.large} 1x`} />
        <source media="(min-width: 38em)" srcSet={`${urls.medium2x} 2x, ${urls.medium} 1x`} />
        <img src={`${urls.small}`} srcSet={`${urls.small2x} 2x, ${urls.small} 1x`} alt="preview" width={'100%'} height={'100%'} />
      </picture>
      {loaded ? (
        <div onClick={() => setPlay(true)} className={isForCompanies ? 'buttonCompany' : 'button'}>
          <i className="play-button"></i>
        </div>
      ) : (
        <PreviewImageLoader />
      )}
    </div>
  );
};

export default PreviewImage;
