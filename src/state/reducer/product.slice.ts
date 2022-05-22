import { RootState } from "./../store";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import validateProduct from "../../fake.api";

export interface Product {
  title: string;
  price: number;
  id: string;
}

export enum ValidationState {
  Fulfilled,
  Pending,
  Rejected,
}

interface ProductsSliceState {
  // products: Product[];
  validationState?: ValidationState;
  errorMessage?: string;
}

export const addProductAsync = createAsyncThunk(
  "products/addNewProduct",
  async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct);
    return product;
  }
);

const initialProducts: Product[] = [
  { title: "Escape From Tarkov", price: 60, id: "eft" },
  { title: "Hunt:showdown", price: 70, id: "hunt" },
  { title: "Hell Let Loose", price: 55, id: "Hll" },
];

// const initialState: ProductsSliceState = {
//   products: initialProducts,
//   validationState: undefined,
//   errorMessage: undefined,
// };

const productAdapter = createEntityAdapter<Product>();
const initialState = productAdapter.getInitialState<ProductsSliceState>({
  errorMessage: undefined,
  validationState: undefined,
});

const fililedInitialState = productAdapter.upsertMany(
  initialState,
  initialProducts
);

const productsSlice = createSlice({
  name: "products",
  initialState: fililedInitialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // return [action.payload, ...state];
      // state.products.push(action.payload);
      productAdapter.upsertOne(state, action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      productAdapter.removeOne(state, action.payload);
    },
    // ({
    //   ...state,
    //   products: state.products.filter(
    //     (product) => product.id !== action.payload
    //   ),
    // }),
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.validationState = ValidationState.Fulfilled;
      state.errorMessage = undefined;
    });
    // ({
    //   ...state,
    //   validationState: ValidationState.Fulfilled,
    //   errorMessage: undefined,
    //   products: [...state.products, action.payload],
    // }));
    builder.addCase(addProductAsync.rejected, (state, action) => ({
      ...state,
      validationState: ValidationState.Rejected,
      errorMessage: action.error.message,
    }));
    builder.addCase(addProductAsync.pending, (state, action) => ({
      ...state,
      validationState: ValidationState.Pending,
      errorMessage: undefined,
    }));
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) =>
  state.products.entities;

export const getErrorMessage = (state: RootState) =>
  state.products.errorMessage;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectEntities: selectProductEntities,
  selectIds: selectProductIds,
  selectTotal: selectTotalProducts,
} = productAdapter.getSelectors<RootState>((state) => state.products);

export default productsSlice.reducer;
