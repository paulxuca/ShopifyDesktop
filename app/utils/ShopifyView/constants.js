const constantsObject = {
  orders: ['id',
            'customer',
            'created_at',
            'fulfillments',
            'financial_status',
            'total_price',
            'name'],
  customers: ['id',
          'default_address',
          'last_order_id',
          'last_order_name',
          'total_spent',
          'first_name',
          'last_name',
          'orders_count'],
  products: ['id',
            'title',
            'vendor',
            'tags',
            'product_type',
            'variants',
            'image'
            ],
  PAGE_LIMIT: 101
};

export default constantsObject;
