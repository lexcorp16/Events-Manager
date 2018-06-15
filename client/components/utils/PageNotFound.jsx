import React from 'react';
import { Link } from 'react-router';

const PageNotFound = () => (
  <div className="text-center" style={{ marginTop: '150px' }}>
    <h1 style={{ fontSize: '250px', color: '#F50057' }}>404</h1>
    <h5>Page Not found</h5>
    <div className="text-center">
      <Link to="/">
        <button
          className="btn btn-default"
          style={{ backgroundColor: '#F50057', width: '150px', color: '#fff' }}
        >
          Go Back
        </button>
      </Link>
    </div>
  </div>
);

export default PageNotFound;
