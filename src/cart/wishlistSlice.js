import { createSlice } from "@reduxjs/toolkit";

const initialWishlistState = {
    wishlist: localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist"))
        : [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialWishlistState,
    reducers: {
        addProductToWishlist: (state, action) => {
            state.wishlist.push({ ...action.payload });
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        },
        removeProductFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        },
        clearWishlist: (state) => {
            state.wishlist = [];
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        },
    },
});

export const { addProductToWishlist, removeProductFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
