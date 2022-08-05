import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Content = ({ modules, setModalPreviewIsOpen, setModalContent, setModalType }) => {
  const openModal = (content, type) => {
    setModalPreviewIsOpen(true);
    setModalContent(content);
    setModalType(type)
  };

  return (
    <div className="collapse show" id="conteudo" aria-labelledby="conteudo" data-parent="#accordionTabs">
      <div className="course-description__module">
        {modules.length > 1
          ? modules.map(({ id, lectures, title }, index) => (
              <React.Fragment key={id}>
                <h3 className="primary">
                  Módulo {index + 1} - {title}
                </h3>
                {lectures.map(({ id, title, previewable, duration, content, type }, index) => (
                  <ul key={id}>
                    <li className={classNames('', { 'disabled': !previewable })}>
                      <p>
                        {index + 1}. {title}
                        <br />
                        <span className="text-sm">{duration}</span>
                      </p>
                      {previewable ? (
                        <button className="btn link primary" onClick={() => openModal(content, type)}>
                          Assista agora
                        </button>
                      ) : (
                        <>
                          <span className="blank">
                            <span className="icon icon-sm icon-lock" />
                          </span>
                        </>
                      )}
                    </li>
                  </ul>
                ))}
              </React.Fragment>
            ))
          : modules[0]?.lectures.map(({ id, title, previewable, duration, content, type }, index) => (
              <ul key={id}>
                <li className={classNames('', { 'disabled': !previewable })}>
                  <p>
                    {index + 1}. {title}
                    <br />
                    <span className="text-sm">{duration}</span>
                  </p>
                  {previewable ? (
                    <button className="btn link primary" onClick={() => openModal(content, type)}>
                      Assista agora
                    </button>
                  ) : (
                    <>
                      <span className="blank">
                        <span className="icon icon-sm icon-lock" />
                      </span>
                    </>
                  )}
                </li>
              </ul>
            ))}
      </div>
    </div>
  );
};

Content.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      lectures: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          previewable: PropTypes.bool.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  setModalPreviewIsOpen: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired
};

export default Content;
