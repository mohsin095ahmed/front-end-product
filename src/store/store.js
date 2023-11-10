import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./cartSlice"
export const store = configureStore({
  reducer: {
    allcart: cartReducer,
  },
});

export default store;