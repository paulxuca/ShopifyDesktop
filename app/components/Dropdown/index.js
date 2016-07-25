import React, { Component } from 'react';

class Dropdown extends Component {
  render() {
    return (
      <div
        className={`dropdown-menu ${this.props.active ? 'active' : ''}`}
      >
        <div className="inner">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
