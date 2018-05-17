import React from 'react';
import AllCentersPage from '../centers/container/AllCenterPage';

const FetchACenterHoc = WrappedComponent =>
  (
    (props) => {
      if (!localStorage.getItem('center-to-get')) {
        return <AllCentersPage />;
      }
      return <WrappedComponent {...props} />;
    }
  );

export default FetchACenterHoc;
