import React, { Component, PropTypes } from 'react';

export default class Preset extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    onPresetClick: PropTypes.func.isRequired,
    currentQuery: PropTypes.bool,
    alignment: PropTypes.string
  }

  onPresetClick() {
    this.props.onPresetClick(this.props.query);
  }

  render() {
    return (
      <span
        style={{ justifyContent: this.props.alignment || 'center' }}
        onClick={::this.onPresetClick}
        className={this.props.currentQuery ? 'active' : ''}
      >
        {this.props.name}
      </span>
  );
  }
}
