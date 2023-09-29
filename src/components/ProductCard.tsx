import { useDispatch } from "react-redux";
import { Product } from "../types/types";

import { AppDispatch } from "../redux/store";
import { cartSlice } from "../redux/slices/cartSlice";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (item: Product) => {
    dispatch(cartSlice.actions.addToCart(item));
  };

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        margin: "5px",
        width: "200px",
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div style={{ padding: "0 10px" }}>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p>{product.category.name}</p>
        <button>See more</button>
        <button onClick={() => handleAddToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
