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
      if (accessToken && storeName) this.props.router.push('/dashboard'); // eslint-disable-line react/prop-types, max-len
    })
    .catch(err => { console.log(err); });
  }

  render() {
    const { errors, data } = this.props.state.mainAppReducer; // eslint-disable-line
    const loading = (errors === '' && data === '') ? <h1>Loading</h1> : null;
    return (
      <div>
        <AppControls />
        <Auth onChange={this.handleStoreNameChange} onSubmit={this.handleStoreNameSubmit} />
        {loading}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
