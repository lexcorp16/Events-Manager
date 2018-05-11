import React from 'react';
import { Link } from 'react-router';

const PaginationLinks = props =>
  (
    <div className="pagination-links">
      <nav aria-label="...">
        <ul className="pagination pagination-lg">
          <li className="page-item disabled">
            <a className="page-link" to="/" tabIndex="-1">1</a>
          </li>
          <li className="page-item"><Link className="page-link" to="/">2</Link></li>
          <li className="page-item"><Link className="page-link" to="/">3</Link></li>
        </ul>
      </nav>
    </div>
  );

export default PaginationLinks;
