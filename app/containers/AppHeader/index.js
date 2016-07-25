import React, { Component, PropTypes } from 'react';
import AppControls from '../../components/AppControls';
import DashboardActions from '../DashboardActions';


class AppHeader extends Component {
  static PropTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="window">
        <div className="header-container">
          <AppControls />
          <DashboardActions />
        </div>
        {this.props.children}
      </div>);
  }
}

export default AppHeader;
