import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addTobasket, removeFromBasket } from '../src/slices/basketSlice';
function CheckoutProduct({
	id,
	title,
	price,
	rating,
	description,
	category,
	image,
	hasPrime,
}){
	var formatter = new Intl.NumberFormat('en-US', {
		style    : 'currency',
		currency : 'USD',
	});
	const dispatch = useDispatch();
	const addItemToBasket = () => {
		const product = {
			id,
			title,
			price,
			rating,
			description,
			category,
			image,
			hasPrime,
		};
		dispatch(addTobasket(product));
	};
	const removeItemFromBasket = () => {
		dispatch(removeFromBasket({ id }));
	};
	return (
		<div className='grid grid-cols-5'>
			<Image
				src={image}
				height={200}
				width={200}
				objectFit='contain'
				alt={title}
			/>
			<div className='col-span-3 mx-5'>
				<p>{title}</p>
				<div className='flex my-2'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className='h-5 text-yellow-500' />
						))}
				</div>
				<p className='text-xs my-2 line-clamp-3'>{description}</p>
				<p>{formatter.format(price)}</p>
				{hasPrime && (
					<div>
						<img
							loading='lazy'
							className='w-12'
							src='https://links.papareact.com/fdw'
							alt='Prime'
						/>
						<p>FREE Next-day Delivery</p>
					</div>
				)}
			</div>
			<div className='flex flex-col space-y-2 my-auto justify-self-end'>
				<button onClick={addItemToBasket} className='button'>
					Add to Basket
				</button>
				<button onClick={removeItemFromBasket} className='button'>
					Remove from Basket
				</button>
			</div>
		</div>
	);
}

export default CheckoutProduct;
