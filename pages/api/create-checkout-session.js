const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){
	if (req.method === 'POST') {
		const { items, email } = req.body;
		const transformedItems = items.map((item) => ({
			description : item.description,
			quantity    : 1,
			price_data  : {
				currency     : 'usd',
				unit_amount  : item.price * 100,
				product_data : {
					name   : item.title,
					images : [
						item.image,
					],
				},
			},
		}));

		const session = await stripe.checkout.sessions.create({
			payment_method_types        : [
				'card',
			],

			shipping_rates              : [
				'shr_1K9CeQIV2b2TdacRH0do4QpR',
			],
			shipping_address_collection : {
				allowed_countries : [
					'GB',
					'US',
					'BF',
				],
			},
			line_items                  : transformedItems,
			mode                        : 'payment',
			success_url                 : `${process.env.HOST}/success`,
			cancel_url                  : `${process.env.HOST}/canceled`,
			metadata                    : {
				email  : email,
				images : JSON.stringify(items.map((item) => item.image)),
			},
		});
		res.status(200).json({ id: session.id });
	}
	else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
