import { configureStore } from "@reduxjs/toolkit";
import products from "./reducer/product.slice";
import cart from "./reducer/cart.slice";
const store = configureStore({
  reducer: {
    products,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
