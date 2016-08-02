import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import shallowCompare from 'react-addons-shallow-compare';

import {
  selectSingleData
} from './selectors';
import {
  loadSingleDataAction
} from './actions';

import OrderLayout from '../../components/OrderLayout';

class DashboardDetail extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.detailViewData && this.props.detailViewData !== nextProps.detailViewData){
      this.props.actions.loadSingleDataAction(nextProps.detailViewData);
    }
  }


  render() {
    return (
      <div className="pane-inner">
        <div className="handle">

        </div>
        <div className="detailView">
          <OrderLayout />
        </div>
      </div>);
  }
}

const mapStateToProps = createStructuredSelector({
  detailData: selectSingleData()
});

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      loadSingleDataAction
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDetail);
