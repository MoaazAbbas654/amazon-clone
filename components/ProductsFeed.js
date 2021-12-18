import Product from './Product';

function ProductsFeed({ products }){
	return (
		<div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
			{products.map((product) => (
				<Product {...product} key={product.id} />
			))}
		</div>
	);
}

export default ProductsFeed;
