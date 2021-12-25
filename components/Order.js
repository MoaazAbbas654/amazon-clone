import moment from 'moment';

function Order({ id, amount, amountShipping, items, timeStamp, images }){
	const formatter = new Intl.NumberFormat('en-US', {
		style    : 'currency',
		currency : 'USD',
	});
	return (
		<div className='relative border rounded-md'>
			<div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
				<p className='font-bold text-xs'>ORDER PLACED</p>
				<p>{moment.unix(timeStamp).format('DD MM YYYY')}</p>
				<div>
					<p className='text-xs font-bold'>TOTAL</p>
					<p>
						{formatter.format(amount)} - Next Day Delivery {' '}
						{formatter.format(amountShipping)}
					</p>
					<p />
				</div>
				<p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
					{items.length} items
				</p>
				<p className='absolute top-2 right-2 w-60 lg:w-72 truncate text-xs whitespace-nowrap'>
					Order #{id}
				</p>
			</div>
			<div className='p-5 sm:p-10'>
				<div className='flex space-x-6 overflow-x-auto '>
					{images.map((image, i) => (
						<img
							key={i}
							src={image}
							alt={`${i}-item`}
							className='h-20 object-contain sm:h-32'
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Order;
