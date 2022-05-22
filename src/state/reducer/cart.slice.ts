import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "./product.slice";

interface CartProduct extends Product {
  amount: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartProduct[],
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex !== -1) {
        state[productIndex].amount += 1;
      } else {
        state.push({ ...action.payload, amount: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      if (state[productIndex].amount > 1) {
        state[productIndex].amount -= 1;
      } else {
        return state.filter((product) => product.id !== action.payload);
      }
    },
  },
});

export const getCartProducts = (state: RootState) => state.cart;
export const getTotalPrice = (state: RootState) =>
  state.cart.reduce((a, b) => (a += b.amount * b.price), 0);
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
