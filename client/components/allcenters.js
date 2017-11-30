import React, { Component } from 'react';
import CenterCard from './centerCard';
import '../public/style.scss';

class CenterPage extends Component {
  render() {
    return (
      <div>
        <h3 className="text-center" style={{color: 'white'}}>All Centers</h3>
        <div className="catalogs" id="descriptions">
          <CenterCard />
        </div>
      </div>
    );
  }
}

export default CenterPage;
