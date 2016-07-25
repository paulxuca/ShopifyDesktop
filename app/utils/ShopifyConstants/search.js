const orderSearchTypes = [
  {
    name: 'All',
    query: ''
  },
  {
    name: 'Open',
    query: 'status = "open"'
  },
  {
    name: 'Unfulfilled',
    query: 'fulfillment_status != "fulfilled"',
  },
  {
    name: 'Unpaid',
    query: 'financial_status = "unpaid"'
  }
];

const customerSearchTypes = [
  {
    name: 'All',
    query: ''
  },
  {
    name: 'Accepts Marketing',
    query: 'accepts_marketing = 1'
  },
  {
    name: 'Repeat Customers',
    query: 'orders_count > 1'
  },
];

const presets = {
  orders: orderSearchTypes,
  customers: customerSearchTypes
};

export default presets;
