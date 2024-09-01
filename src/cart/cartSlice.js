import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log("state",state);
            const existingProduct = state.cart.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.cart.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removeProduct: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        incrementQuantity: (state, action) => {
            const product = state.cart.find(product => product.id === action.payload);
            if (product) {
                product.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        decrementQuantity: (state, action) => {
            const product = state.cart.find(product => product.id === action.payload);
            if (product) {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    state.cart = state.cart.filter(item => item.id !== action.payload);
                }
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        }
    },
});

export const { addProduct, removeProduct, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
