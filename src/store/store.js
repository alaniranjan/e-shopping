import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../cart/cartSlice';
import wishlistReducer from '../cart/wishlistSlice'
import productReducer from "../cart/productSlice"
import authReducer from "../cart/AuthSlice"

export const store = configureStore({
  reducer:{
    cart:cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    auth: authReducer,
  }
})