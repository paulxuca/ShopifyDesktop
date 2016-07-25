import React, { Component, PropTypes } from 'react';

class DashboardNavigationItem extends Component {
  static PropTypes = {
    onNavItemClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.clickOnItem = this.clickOnItem.bind(this);
  }

  clickOnItem() {
    this.props.onNavItemClick(this.props.name); //eslint-disable-line
  }

  render() {
    const active = (this.props.active) ? 'active' : ''; // eslint-disable-line

    return (<a className={`nav-group-item ${active}`} onClick={this.clickOnItem}>
      <h4>{this.props.name}</h4>
    </a>);
  }
}

export default DashboardNavigationItem;
// <span className={`icon ${this.props.icon}`}></span>
