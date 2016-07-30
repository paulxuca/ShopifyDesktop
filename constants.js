module.exports = {
	serverConstants:[
	'order_transactions/create', 'orders/cancelled', 'orders/create', 'orders/delete', 'orders/fulfilled', 'orders/paid', 'orders/partially_fulfilled', 'orders/updated'
	]
};

// These are datatypes filtered out because the Shopify API cannot handle me creating 31 webhooks with data pulling right after client side
//'checkouts/create', 'checkouts/delete', 'checkouts/update', 'collections/create', 'collections/delete', 'collections/update', 'customer_groups/create', 'customer_groups/delete', 'customer_groups/update', 'customers/create', 'customers/delete', 'customers/disable', 'customers/enable', 'customers/update', 'disputes/create', 'disputes/update', 'fulfillment_events/create', 'fulfillment_events/delete', 'fulfillments/create', 'fulfillments/update', , 'products/create', 'products/delete', 'products/update', 'refunds/create', 'shop/update'