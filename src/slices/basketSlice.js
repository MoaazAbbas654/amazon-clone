import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items : [],
};

export const basketSlice = createSlice({
	name         : 'basket',
	initialState,
	reducers     : {
		addTobasket      : (state, action) => {
			state.items = [
				...state.items,
				action.payload,
			];
		},
		removeFromBasket : (state, action) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id,
			);
			let newBasket = [
				...state.items,
			];
			if (index >= 0) {
				newBasket.splice(index, 1);
			}
			else {
				console.warn(
					`Cant remove product (id: ${action.payload
						.id}) as its not in Basket`,
				);
			}
			state.items = newBasket;
		},
	},
});

export const { addTobasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state) => state.basket.items;

export const selectTotal = (state) =>
	state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
