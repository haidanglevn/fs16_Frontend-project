import {
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
  removeFromCart,
  selectCart,
} from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/types";

import { Typography, Button, Box, Stack, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CartEmpty from "../components/CartEmpty";
export default function CartPage() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleRemoveFromCart = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    dispatch(decreaseQuantity(item));
  };

  const calculateCartTotal = () => {
    let total = 0;
    cart.map((item) => {
      return (total += item.price * item.quantity);
    });
    return `$${total}`;
  };

  return (
    <Box
      sx={{
        padding: "50px 100px",
      }}
    >
      <Typography variant="h4">Your cart ({cart.length}):</Typography>
      <Stack mt={5} gap={"20px"}>
        {cart.map((item: CartItem) => (
          <Stack
            direction={"row"}
            gap={"20px"}
            sx={{
              height: "100px",
              borderBottom: "1px solid black",
              padding: "10px 10px 10px 0",
            }}
          >
            <img
              src={item.images[0]}
              style={{ height: "100%", width: "200px" }}
              alt={`${item.title}`}
            />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ width: "100%" }}
            >
              <Stack>
                <Typography variant="h5">{item.title}</Typography>
                <Typography>
                  Price: $<b>{item.price}</b>
                </Typography>
                <Typography>
                  Quantity: <b>{item.quantity}</b>
                </Typography>
              </Stack>
              <Stack alignItems={"flex-end"}>
                <IconButton
                  color="warning"
                  onClick={() => handleRemoveFromCart(item)}
                  sx={{ width: "30px" }}
                >
                  <DeleteIcon />
                </IconButton>
                <Typography>
                  $<b>{item.price * item.quantity}</b>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          //     <Button
          //       variant="contained"
          //       color="primary"
          //       onClick={() => handleIncreaseQuantity(item)}
          //     >
          //       Increase
          //     </Button>
        ))}
      </Stack>

      {cart.length !== 0 ? (
        <>
          <Stack alignItems={"flex-end"} mt={2}>
            <Typography variant="h4">Total: {calculateCartTotal()} </Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={"10px"}
            mt={2}
            justifyContent={"space-between"}
          >
            <Button variant="contained" color="error" onClick={handleEmptyCart}>
              Empty the cart
            </Button>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Stack>
        </>
      ) : (
        <CartEmpty />
      )}
    </Box>
  );
}
