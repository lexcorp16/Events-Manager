import React, { Component } from 'react';
import Footer from '../components/footer';
import SignupBody from '../components/signupbody';
import Navbar from '../components/navbar';
/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
export default class App extends Component {
  render() {
    return (
      <div>
        <div className='container-fluid'>
        <Navbar />
        <SignupBody />
        </div>

        <Footer />
      </div>
    );
  }
}
