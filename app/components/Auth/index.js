import React, { Component } from 'react';

class Auth extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input type="text" id="shopName" onChange={this.props.onChange} placeholder="Your store name" />
        <button type="submit">Login To Store</button>
      </form>
    );
  }
}

export default Auth;
