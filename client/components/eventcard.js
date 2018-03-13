import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { seeEvents } from '../actions/eventActions';

const eventImageTemplate ="https://farm4.staticflickr.com/3100/2693171833_3545fb852c_q.jpg"

class EventCard extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount () {
    this.props.dispatch(seeEvents());
  }

  render () {
    return (
      <div>
        <div className="row container userevents-large d-none d-lg-block">
          <div className="[ col-xs-12 col-sm-offset-2 col-sm-8 ]">
            <ul className="event-list">
              <li>
                <time datetime="2014-07-20">
                  <span className="day">4</span>
                  <span className="month">Jul</span>
                  <span className="year">2014</span>
                  <span className="time">ALL DAY</span>
                </time>
                <img alt="Independence Day" />
                <div className="info">
                  <h2 className="title">Independence Day</h2>
                  <p className="desc">United States Holiday</p>
                </div>
                <div className="social">
                  <ul>
                    <li className="twitter" style={{ width: `${33}%`}}><a href="#twitter"><span className="fa fa-edit"></span></a></li>
                    <li className="google-plus" style={{ width: `${33}%`}}><a href="#google-plus"><span className="fa fa-trash"></span></a></li>
                    <li className="facebook" style={{ width: `${33}%`}}><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row container userevents-small d-lg-none">
          <div className="[ col-xs-12 col-sm-offset-2 col-sm-8 ]">
            <ul className="event-list">
              <li>
                <time datetime="2014-07-20">
                  <span className="day">4</span>
                  <span className="month">Jul</span>
                  <span className="year">2014</span>
                  <span className="time">ALL DAY</span>
                </time>
                <img alt="Independence Day" />
                <div className="info">
                  <h2 className="title">Independence Day</h2>
                  <p className="desc">United States Holiday</p>
                </div>
                <div className="social">
                  <ul>
                    <li className="twitter" style={{ width: `${33}%`}}><a href="#twitter"><span className="fa fa-edit"></span></a></li>
                    <li className="google-plus" style={{ width: `${33}%`}}><a href="#google-plus"><span className="fa fa-trash"></span></a></li>
                    <li className="facebook" style={{ width: `${33}%`}}><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
  event: state.eventReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
