import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTobasket } from '../src/slices/basketSlice';
function Product({ id, title, price, description, category, image }){
	const [
		rating,
	] = useState(Math.floor(Math.random() * 5) + 1);

	const [
		hasPrime,
	] = useState(Math.random() < 0.5);

	const formatter = new Intl.NumberFormat('en-US', {
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

	return (
		<div className='relative flex flex-col m-5 bg-white z-30 p-10'>
			<p className='absolute top-2 right-2 text-xs italic text-gray-400'>
				{category}
			</p>
			<Image
				src={image}
				width={200}
				height={200}
				alt={title}
				objectFit='contain'
			/>
			<h4 className='my-3'>{title}</h4>
			<div className='flex'>
				{Array(rating)
					.fill()
					.map((_, i) => (
						<StarIcon className='text-yellow-500 h-5' key={i} />
					))}
			</div>
			<p className='my-2 line-clamp-2'>{description}</p>
			<div className='mb-5'>
				<p>{formatter.format(price)}</p>
			</div>
			{hasPrime && (
				<div className='flex items-center space-x-2 -mt-5'>
					<img
						className='w-12'
						src='http://links.papareact.com/fdw'
						alt='prime-logo'
					/>
					<p className='text-xs text-gray-500'>
						FREE Next-day Delivery
					</p>
				</div>
			)}

			<button onClick={addItemToBasket} className='mt-auto button'>
				Add to basket
			</button>
		</div>
	);
}

export default Product;
