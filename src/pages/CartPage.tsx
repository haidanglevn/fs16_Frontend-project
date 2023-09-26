import { cartSlice, selectCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/types";

export default function CartPage() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(cartSlice.actions.emptyCart());
  };
  return (
    <div>
      <h1>Your cart: </h1>
      {cart.map((item: CartItem) => {
        return (
          <div>
            {item.title}: {item.quantity}
          </div>
        );
      })}
      <button onClick={handleEmptyCart}>Empty the cart</button>
    </div>
  );
}
