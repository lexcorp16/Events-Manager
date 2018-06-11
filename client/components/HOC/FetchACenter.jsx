import React from 'react';
import AllCentersPage from '../centers/container/AllCenterPage';

const FetchACenter = WrappedComponent =>
  (
    (props) => {
      if (!localStorage.getItem('center-to-get')) {
        return <AllCentersPage />;
      }
      return <WrappedComponent {...props} />;
    }
  );

export default FetchACenter;
