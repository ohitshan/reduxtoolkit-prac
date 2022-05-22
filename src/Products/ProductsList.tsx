import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../state/hooks/store.hooks";
import { addToCart } from "../state/reducer/cart.slice";
import {
  getProductsSelector,
  Product,
  removeProduct,
  selectAllProducts,
  selectProductById,
  selectProductEntities,
  selectProductIds,
  selectTotalProducts,
} from "../state/reducer/product.slice";
import { RootState } from "../state/store";

const ProductsList: React.FC = () => {
  const products = useSelector(selectAllProducts);
  const eft = useSelector<RootState>((state) =>
    selectProductById(state, "eft")
  );
  const totalNumberOfProducts = useSelector(selectTotalProducts);
  const productsids = useSelector(selectProductIds);
  const entities = useSelector(selectProductEntities);
  console.log(products);
  console.log(eft);
  console.log(totalNumberOfProducts);
  console.log(productsids);
  console.log(entities);
  console.log(entities["eft"]);
  const dispatch = useAppDispatch();

  const removeFromStore = (id: string) => {
    dispatch(removeProduct(id));
  };

  const addToCartHandler = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h2>Games List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <span>{`${product.title}:${product.price}`}</span>
          <button onClick={() => addToCartHandler(product)}>Add To Cart</button>
          <button onClick={() => removeFromStore(product.id)}>
            Remove from the store
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
