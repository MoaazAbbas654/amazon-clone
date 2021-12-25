import { buffer } from 'micro';
import * as admin from 'firebase-admin';

//Secure a connection to Firebase from the backend

const serviceAccount = require('../../permissions.json');

const app =
	!admin.apps.length ? admin.initializeApp({
		credential : admin.credential.cert(serviceAccount),
	}) :
	admin.app();

// Establish connection to Stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullFillOrder = async (session) => {
	console.log('FullFilling Order', session);
	return app
		.firestore()
		.collection('users')
		.doc(session.metadata.email)
		.collection('orders')
		.doc(session.id)
		.set({
			amount          : session.amount_total / 100,
			amount_shipping : session.total_details.amount_shipping / 100,
			images          : JSON.parse(session.metadata.images),
			timestamp       : admin.firestore.FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log(`SUCCESS: Order ${session.id} has been added to DB`);
		});
};

async function handler(req, res){
	if (req.method === 'POST') {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers['stripe-signature'];

		let event;

		try {
			event = stripe.webhooks.constructEvent(
				payload,
				sig,
				endpointSecret,
			);
		} catch (error) {
			console.log('ERROR', error.message);
			return res.status(400).send(`Webhook error: ${error.message}`);
		}
		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;

			// Full fill the order
			return fullFillOrder(session)
				.then(() => res.status(200))
				.catch((err) =>
					res.status(400).send(`WebHook Error: ${err.message}`),
				);
		}
	}
}

export const config = {
	api : {
		bodyParser      : false,
		externalResolve : true,
	},
};

export default handler;
