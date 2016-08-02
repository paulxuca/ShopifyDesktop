import { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class DashboardListItem extends Component {
  static PropTypes = {
    properties: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  listItemClick = () => {
    this.props.onListItemClick(this.props.properties.id);
  }

  render() {
    const { properties, view } = this.props;

      if(view === 'orders') { //eslint-disable-line
        const generateOrder = require('./rendering').generateOrder;
        return generateOrder(properties, this.listItemClick);
      } else if (view === 'customers') {
        const generateCustomer = require('./rendering').generateCustomer;
        return generateCustomer(properties, this.listItemClick);
      } else if (view === 'products') {
        const generateProducts = require('./rendering').generateProducts;
        return generateProducts(properties, this.listItemClick);
      }
  }
}

export default DashboardListItem;
