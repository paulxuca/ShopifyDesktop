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
    query: 'fulfillment_status != "fulfilled" AND financial_status != "refunded" AND fulfillment_status != "null"',
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

const productSearchTypes = [
  {
    name: 'All',
    query: 'product_type !=  ""'
  },
  {
    name: 'Accessories',
    query: 'product_type = "accessories"'
  },
  {
    name: 'Sweaters',
    query: 'product_type = "sweater"'
  }
];

const presets = {
  orders: orderSearchTypes,
  customers: customerSearchTypes,
  products: productSearchTypes
};

export default presets;
