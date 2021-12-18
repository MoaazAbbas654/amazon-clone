import Image from 'next/image';
import Product from './Product';

function ProductsFeed({ products }){
	return (
		<div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
			{products
				.slice(0, 4)
				.map((product) => <Product {...product} key={product.id} />)}

			<img
				className='w-full md:col-span-full md:max-h-72'
				src='https://m.media-amazon.com/images/I/612MnqOTiYL._SX3000_.jpg'
				alt='adv'
			/>

			<div className='md:col-span-2'>
				{products
					.slice(4, 5)
					.map((product) => (
						<Product {...product} key={product.id} />
					))}
			</div>

			{products
				.slice(5, products.length)
				.map((product) => <Product {...product} key={product.id} />)}
		</div>
	);
}

export default ProductsFeed;
