import Image from 'next/image';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import { selectItems, selectTotal } from '../src/slices/basketSlice';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(
	`pk_test_51K9CELIV2b2TdacRw6L0YVrD7meAXUI1rF4tMIZiSP94d6CwqtfGytsWspCnOUxl01TycJU30PcvogU3BQLyAv2o008DZksgF2`,
);
function Checkout(){
	const items = useSelector(selectItems);
	const { data: session } = useSession();
	const total = useSelector(selectTotal);

	const formatter = new Intl.NumberFormat('en-US', {
		style    : 'currency',
		currency : 'USD',
	});

	const createCheckoutSession = async (e) => {
		e.preventDefault();
		const stripe = await stripePromise;

		const checkoutSession = await axios.post(
			'/api/create-checkout-session',
			{
				items : items,
				email : session.user.email,
			},
		);
		const result = stripe.redirectToCheckout({
			sessionId : checkoutSession.data.id,
		});
		console.log(result);
		if (result.error) {
			alert(result.error.message);
		}
	};

	return (
		<div className='bg-gray-100'>
			<Header />
			<main className='lg:flex max-w-screen-2xl mx-auto'>
				{/* left */}
				<div className='flex-grow m-5 shadow-sm'>
					<Image
						src={'https://links.papareact.com/ikj'}
						width={1020}
						height={250}
						objectFit='contain'
						alt='adv'
					/>
					<div className='flex flex-col space-y-10 p-5 bg-white'>
						<h1 className='text-3xl border-b pb-4'>
							{
								items.length ===
								0 ? 'Your Amazon Basket is empty' :
								'Shopping Basket'}
						</h1>
						{items.map((item, i) => (
							<CheckoutProduct key={item.id} {...item} />
						))}
					</div>
				</div>

				{/* right */}
				<div className='flex flex-col bg-white p-10 shadow-md'>
					{items.length > 0 && (
						<form onSubmit={createCheckoutSession}>
							<h2 className='whitespace-nowrap'>
								Subtotal ({items.length} items):
								<span className='font-bold'>
									{formatter.format(total)}
								</span>
							</h2>
							<button
								role='link'
								disabled={!session}
								className={`button mt-2 ${!session &&
									'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
							>
								{
									!session ? 'Sign in to Checkout' :
									'Proceed to Checkout'}
							</button>
						</form>
					)}
				</div>
			</main>
		</div>
	);
}

export default Checkout;
