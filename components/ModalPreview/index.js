import React from 'react';
import PropTypes from 'prop-types';
import Vimeo from '@u-wave/react-vimeo';
import VideoPlayer from '../../components/VideoPlayer';

const ModalPreview = ({ setModalPreviewIsOpen, content, type }) => (
  <div className="popup__overlay popup__overlay--top-zero">
    <div className={type === 'self_hosted_video' ? 'popup__self' : 'popup__video'}>
      <div className="btn-close-w" onClick={() => setModalPreviewIsOpen(false)}>
        fechar
      </div>
      {type === 'self_hosted_video' ? (
        <div className="popup__self__iframe">
          <VideoPlayer content={content} />
        </div>
      ) : (
        <div className="popup__video__iframe">
          <Vimeo autoplay color="#fc4303" video={content} />
        </div>
      )}
    </div>
  </div>
);

ModalPreview.propTypes = {
  setModalPreviewIsOpen: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
};

export default ModalPreview;
