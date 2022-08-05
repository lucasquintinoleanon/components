import React from 'react';
import ContentLoader from 'react-content-loader';

const CourseCardLoader = () => (
  <div className="card-loader">
    <ContentLoader speed={2} viewBox="0 0 400 550" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="228" />
      <rect x="10px" y="250" rx="2" ry="2" width="60%" height="28" />
      <rect x="10px" y="330" rx="2" ry="2" width="calc(100% - 20px)" height="18" />
      <rect x="10px" y="358" rx="2" ry="2" width="60%" height="18" />
      <rect x="10px" y="450" rx="2" ry="2" width="120" height="35" />
      <rect x="10px" y="495" rx="2" ry="2" width="100" height="15" />
      <rect x="calc(100% - 140px)" y="460" rx="2" ry="2" width="130px" height="50px" />
    </ContentLoader>
  </div>
);

export default CourseCardLoader;
// <div className="card-loader">
// <ContentLoader speed={2} viewBox="0 0 100 57" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
//   <rect x="0" y="0" rx="2" ry="2" width="100%" height="228" />
// </ContentLoader>
// <ContentLoader speed={2} width="100%" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
//   <rect x="10px" y="15px" rx="2" ry="2" width="60%" height="28px" />
//   <rect x="10px" y="35px" rx="2" ry="2" width="calc(100% - 20px)" height="18px" />
//   <rect x="10px" y="63px" rx="2" ry="2" width="60%" height="18px" />
//   <rect x="10px" y="91px" rx="2" ry="2" width="120" height="30px" />
//   <rect x="10px" y="131px" rx="2" ry="2" width="100" height="10px" />
//   <rect x="calc(100% - 140px)" y="200" rx="2" ry="2" width="130px" height="50px" />
// </ContentLoader>
// </div>