// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey            : 'AIzaSyANXVXJkBJWj1zeZzrSklfZxMYXYP7KLtE',
	authDomain        : 'clone-68502.firebaseapp.com',
	projectId         : 'clone-68502',
	storageBucket     : 'clone-68502.appspot.com',
	messagingSenderId : '632197140735',
	appId             : '1:632197140735:web:9a7090f5ee33408309bcca',
};

initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
