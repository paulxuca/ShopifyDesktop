import React, { Component, PropTypes } from 'react';

import navigationList from './enums';
import DashboardNavigationItem from '../../components/DashboardNavigationItem';

class DashboardNavigation extends Component {
  static PropTypes = {
    currentView: PropTypes.string.isRequired,
    storeName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.currentView === this.props.currentView && nextProps.storeName === this.props.storeName ) {
      return false;
    }
    return true;
  }

  navigateToNewView = (nextView) => {
    if (nextView !== this.props.currentView) this.props.onClick(nextView); // eslint-disable-line
  }

  render() {
    const { storeName, currentView } = this.props; // eslint-disable-line react/prop-types, max-len
    return (<div className="pane-sm sidebar" id="pane-navigation">
      <nav className="nav-group">
        {navigationList.map((eachNav) => { // eslint-disable-line
          return (
            <DashboardNavigationItem
              onNavItemClick={this.navigateToNewView}
              active={currentView === eachNav.name}
              name={eachNav.name}
              icon={eachNav.icon}
              key={eachNav.name}
            />);
        })}
        <h5 className="nav-group-title">{storeName}</h5>
      </nav>

    </div>
);
  }
}

export default DashboardNavigation;
