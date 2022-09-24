import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCartState = {
    cartItems: [],
    showCart: false,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        showCart(state) {
            state.showCart = !state.showCart;
        },
        totalQuantity(state) {
            state.totalQuantity = state.cartItems.reduce((curr, acc) => {
                return curr + acc.quantity;
            }, 0);
        },
        fetchDataHandler(state, action) {
            state.cartItems = action.payload === null ? [] : action.payload;
        },
        cartItems(state, action) {
            const newItem = { ...action.payload };
            let itemsArray = [...state.cartItems];

            let duplicate = itemsArray.find((e) => {
                return e.title === newItem.title;
            });
            if (duplicate) {
                let indexOfDuplicate = itemsArray.indexOf(duplicate);
                itemsArray[indexOfDuplicate] = {
                    ...itemsArray[indexOfDuplicate],
                    quantity: itemsArray[indexOfDuplicate].quantity + 1,
                };
                state.cartItems = itemsArray;
            } else {
                state.cartItems = [...state.cartItems, newItem];
            }
        },
        addAndRemove(state, action) {
            const newItem = { ...action.payload };
            let itemsArray = [...state.cartItems];
            let duplicate = itemsArray.find((e) => {
                return e.title === newItem.title;
            });

            let indexOfDuplicate = itemsArray.indexOf(duplicate);
            itemsArray[indexOfDuplicate] = {
                ...itemsArray[indexOfDuplicate],
                quantity:
                    itemsArray[indexOfDuplicate].quantity +
                    action.payload.modify,
            };

            if (itemsArray[indexOfDuplicate].quantity === 0) {
                state.cartItems = state.cartItems.filter(
                    (e) => newItem.title !== e.title
                );
                console.log(state.cartItems);
                return;
            }

            state.cartItems = itemsArray;
        },
    },
});

const store = configureStore({
    reducer: cartSlice.reducer,
});

/* auth: authSlice.reducer,
}, */

export const cartActions = cartSlice.actions;

export default store;
