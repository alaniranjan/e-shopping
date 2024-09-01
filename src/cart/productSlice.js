import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
    products: [],
};

export const productSlice = createSlice({
    name: 'products',
    initialState: initialProductState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
        },
      
        removeProduct: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const product = state.products.find(product => product.id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const product = state.products.find(product => product.id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        }
    },
});

export const { setProducts, addProduct, updateProduct, removeProduct, incrementQuantity, decrementQuantity } = productSlice.actions;
export default productSlice.reducer;
