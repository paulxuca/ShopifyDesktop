import React, { Component } from 'react';

class Auth extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input type="text" id="shopName" onChange={this.props.onChange} />
        <button type="submit">Enter</button>
      </form>
    );
  }
}

export default Auth;
