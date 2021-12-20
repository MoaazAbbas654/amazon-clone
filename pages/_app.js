import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
export default function MyApp({
	Component,
	pageProps : { session, ...pageProps },
}){
	return (
		<Provider store={store}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</Provider>
	);
}
