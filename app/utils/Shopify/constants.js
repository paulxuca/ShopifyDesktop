export const numberDataTypes = {
  id: 'id',
  number: 'number',
  total_price: 'total_price',
  subtotal_price: 'subtotal_price',
  total_weight: 'total_weight',
  total_tax: 'total_tax',
  total_discounts: 'total_discounts',
  total_line_items_price: 'total_line_items_price',
  total_price_usd: 'total_price_usd',
  'total_spent': 'total_spent',
  order_number: 'order_number'
};

export const booleanDataTypes = {
  buyer_accepts_marketing: 'buyer_accepts_marketing',
  confimed: 'confimed',
  taxes_included: 'taxes_included',
  tax_exempt: 'tax_exempt',
  test: 'test',
  verified_email: 'verified_email'
};

const orders = {
  id: null,
  email: null,
  closed_at: null,
  created_at: null,
  updated_at: null,
  number: null,
  note: null,
  token: null,
  gateway: null,
  test: null,
  total_price: null,
  subtotal_price: null,
  total_weight: null,
  total_tax: null,
  taxes_included: null,
  currency: null,
  financial_status: null,
  confirmed: null,
  total_discounts: null,
  total_line_items_price: null,
  cart_token: null,
  buyer_accepts_marketing: null,
  name: null,
  referring_site: null,
  landing_site: null,
  cancelled_at: null,
  cancel_reason: null,
  total_price_usd: null,
  checkout_token: null,
  reference: null,
  user_id: null,
  location_id: null,
  source_identifier: null,
  source_url: null,
  processed_at: null,
  device_id: null,
  browser_ip: null,
  landing_site_ref: null,
  order_number: null,
  discount_codes: null,
  note_attributes: null,
  payment_gateway_names: null,
  processing_method: null,
  checkout_id: null,
  source_name: null,
  fulfillment_status: null,
  tax_lines: null,
  tags: null,
  contact_email: null,
  order_status_url: null,
  line_items: null,
  shipping_lines: null,
  billing_address: null,
  shipping_address: null,
  fulfillments: null,
  client_details: null,
  refunds: null,
  payment_details: null,
  customer: null,
  status: null
};

const customers = {
  id: null,
  email: null,
  accepts_marketing: null,
  created_at: null,
  updated_at: null,
  first_name: null,
  last_name: null,
  orders_count: null,
  state: null,
  total_spent: null,
  last_order_id: null,
  note: null,
  verified_email: null,
  multipass_identifier: null,
  tax_exempt: null,
  tags: null,
  last_order_name: null,
  default_address: null,
  addresses: null
};

const products = {
  id: null,
  title: null,
  body_html: null,
  vendor: null,
  product_type: null,
  created_at: null,
  handle: null,
  updated_at: null,
  published_at: null,
  template_suffix: null,
  published_scope: null,
  tags: null,
  variants: null,
  options: null,
  images: null,
  image: null
};

export const DataDefaults = {
  orders,
  customers,
  products,
};