import React from 'react';
import ContentLoader from 'react-content-loader';
const PreviewImageLoader = () => (
  <div style={{ width: '100%', height: '100%' }}>
    <ContentLoader speed={2} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" viewBox="0 0 400 200">
      <rect x="0" y="0" rx="3" ry="3" width="410" height="210" />
    </ContentLoader>
  </div>
);

export default PreviewImageLoader;
