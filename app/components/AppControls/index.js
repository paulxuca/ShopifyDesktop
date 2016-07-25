import React, { Component } from 'react';
const remote = require('electron').remote;


export default class AppControls extends Component {
  componentDidMount() {
    document.getElementById('close-window').addEventListener('click', () => {
      const window = remote.getCurrentWindow();
      window.close();
    });
    document.getElementById('minimize-window').addEventListener('click', () => {
      const window = remote.getCurrentWindow();
      window.minimize();
    });
    document.getElementById('maximize-window').addEventListener('click', () => {
      const window = remote.getCurrentWindow();
      window.setFullScreen(!window.isFullScreen());
    });
  }

  render() {
    return (
      <div className="header bordered controls">
        <div className="window-controls">
          <div className="buttons">
            <div className="button close" id="close-window" />
            <div className="button minimize" id="minimize-window" />
            <div className="button maximize" id="maximize-window" />
          </div>
        </div>
      </div>);
  }
}
