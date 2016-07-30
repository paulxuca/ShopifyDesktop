import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as authActions from '../App/actions';
import Auth from '../../components/Auth';
import AppControls from '../../components/AppControls';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: ''
    };
    this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
    this.handleStoreNameSubmit = this.handleStoreNameSubmit.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    const { errors, data } = this.props.state.mainAppReducer; //eslint-disable-line
    if (!errors && !data) {
      this.props.actions.checkCredentials() //eslint-disable-line
      .then(() => { this.props.router.push('dashboard'); }); //eslint-disable-line
    }
  }

  handleStoreNameChange(event) {
    this.setState({ shopName: event.target.value });
  }

  handleStoreNameSubmit(event) {
    event.preventDefault();
    this.props.actions.loginShop(this.state.shopName) // eslint-disable-line react/prop-types
    .then(() => {
      const { accessToken, storeName } = this.props.state.mainAppReducer.data; // eslint-disable-line react/prop-types, max-len
      // if (accessToken && storeName) this.props.router.push('/dashboard'); // eslint-disable-line react/prop-types, max-len
    })
    .catch(err => { console.log(err); });
  }

  render() {
    const { errors, data, isFetching } = this.props.state.mainAppReducer; // eslint-disable-line
    const loading = (isFetching) ? <div className="overlay" /> : null;
    return (
      <div>
        <AppControls />
        {loading}
        <div style={{ backgroundImage: 'url("static/assets/loginbg.png")', height: '100vh' }}>
          <div className="login-inner">
            <div className="login-form-row">
              <img src="static/assets/shopify.svg" role="presentation" className="shopifyLogo" />
              <div className="login-form">
                <Auth onChange={this.handleStoreNameChange} onSubmit={this.handleStoreNameSubmit} />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: {
      mainAppReducer: state.get('mainAppReducer')
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
