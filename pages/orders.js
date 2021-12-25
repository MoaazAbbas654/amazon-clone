import { getSession } from 'next-auth/react';
import Header from '../components/Header';
import moment from 'moment';
import db from '../firebase';
import { doc, getDocs, collection, orderBy } from 'firebase/firestore';
import Order from '../components/Order';
function Orders({ orders }){
	console.log(process.env);
	return (
		<div>
			<Header />
			<main className='max-w-screen-lg mx-auto p-10'>
				<h1 className='border-b text-3xl border-yellow-500 mb-2 pb-1'>
					Your orders
				</h1>
				{
					orders ? <h2>{orders.length} Orders</h2> :
					<h2>Please sign in to see your orders</h2>}
				<div className='mt-5 space-y-4'>
					{orders.map(
						({
							id,
							amount,
							amountShipping,
							items,
							timeStamp,
							images,
						}) => (
							<Order
								key={id}
								id={id}
								amount={amount}
								amountShipping={amountShipping}
								items={items}
								timeStamp={timeStamp}
								images={images}
							/>
						),
					)}
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(context){
	const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
	const session = await getSession(context);
	if (!session) {
		return {
			props : {},
		};
	}

	const docRef = doc(db, 'users', session.user.email);
	const colRef = collection(docRef, 'orders');
	const stripeOrders = await getDocs(colRef, orderBy('timeStamp', 'desc'));
	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id             : order.id,
			amount         : order.data().amount,
			amountShipping : order.data().amount_shipping,
			images         : order.data().images,
			timeStamp      : moment(order.data().timestamp.toDate()).unix(),
			items          : (await stripe.checkout.sessions.listLineItems(
				order.id,
				{
					limit : 100,
				},
			)).data,
		})),
	);

	return {
		props : { orders },
	};
}

export default Orders;
