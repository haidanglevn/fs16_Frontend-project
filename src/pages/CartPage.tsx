import { selectCart } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";

export default function CartPage() {
  const cart = useSelector(selectCart);

  return (
    <div>
      {cart.map((item) => {
        return (
          <div>
            {item.title}: {item.quantity}
          </div>
        );
      })}
    </div>
  );
}
