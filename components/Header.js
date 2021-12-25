import Image from 'next/image';
import {
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon,
} from '@heroicons/react/outline';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../src/slices/basketSlice';

function Header(){
	const { data: session } = useSession();
	const router = useRouter();
	const items = useSelector(selectItems);
	return (
		<header>
			<div className='flex items-center bg-amazon_blue p-1 py-2 flex-grow'>
				<div className='flex mt-2 items-center flex-grow sm: flex-grow-0 px-2'>
					<Image
						onClick={() => router.push('/')}
						src='http://links.papareact.com/f90'
						width={150}
						height={40}
						alt='Amazon'
						objectFit='contained'
						className='cursor-pointer'
					/>
				</div>
				<div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
					<input
						className='p-2 h-full w-6 flex-grow flex-1 rounded-l-md focus:outline-none'
						type='text'
					/>
					<SearchIcon className='h-12 p-4' />
				</div>
				<div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
					<div
						onClick={

								!session ? signIn :
								signOut
						}
						className='link'
					>
						{
							session ? <p>Hello {session.user.name}</p> :
							<p>Sign in</p>}
						<p className='font-extrabold md:text-sm'>
							account & list
						</p>
					</div>
					<div
						className='link'
						onClick={() => router.push('/orders')}
					>
						<p>Returns</p>
						<p className='font-extrabold md:text-sm'>& Orders</p>
					</div>
					<div
						onClick={() => router.push('/checkout')}
						className='relative flex items-center link'
					>
						<span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold'>
							{items.length}
						</span>
						<ShoppingCartIcon className='h-10' />
						<p className='hidden md:inline font-extrabold md:text-sm mt-2'>
							Basket
						</p>
					</div>
				</div>
			</div>
			<div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
				<p className='link flex items-center'>
					<MenuIcon className='h-6 mr-1' /> All
				</p>
				<p className='link'> Prime Video</p>
				<p className='link'> Amazon Business</p>
				<p className='link'> Today&apos; Deals</p>
				<p className='link hidden lg:inline-flex'> Electronics</p>
				<p className='link hidden lg:inline-flex'> Food & Grocery</p>
				<p className='link hidden lg:inline-flex'> Prime</p>
				<p className='link hidden lg:inline-flex'> Buy Again</p>
				<p className='link hidden lg:inline-flex'> Shopper ToolKit</p>
				<p className='link hidden lg:inline-flex'> Health & Personal</p>
			</div>
		</header>
	);
}

export default Header;
