import {
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
  removeFromCart,
  selectCart,
} from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/cartSlice";

import {
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CartEmpty from "../components/CartEmpty";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useScreenSizes } from "../hooks/useScreenSizes";

export default function CartPage() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isMediumScreen } = useScreenSizes();

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
        padding: isMediumScreen ? "20px" : "50px 100px",
        minHeight: "var(--body-min-height)",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" color={"text.primary"}>
        Your cart ({cart.length}):
      </Typography>
      <Stack mt={5} gap={"20px"}>
        {cart.map((item: CartItem) => (
          <Stack
            direction={"row"}
            gap={"20px"}
            sx={{
              height: isMediumScreen ? "150px" : "100px",
              borderBottom: `1px solid var(--primary-color)`,
              padding: "10px 10px 10px 0",
            }}
            key={item.id}
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
              <Stack gap={"10px"}>
                <Typography variant="h5" color={"text.primary"}>
                  {item.title}
                </Typography>
                <Typography color={"text.primary"}>
                  Price: $<b>{item.price}</b>
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{ width: "30vw" }}
                >
                  <Typography color={"text.primary"}>Quantity:</Typography>
                  <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                    <Button
                      color="info"
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      <ArrowDownwardIcon />
                    </Button>
                    <Typography color={"text.primary"}>
                      <b>{item.quantity}</b>
                    </Typography>
                    <Button
                      color="info"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      <ArrowUpwardIcon />
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Stack alignItems={"flex-end"}>
                <IconButton
                  color="warning"
                  onClick={() => handleRemoveFromCart(item)}
                  sx={{ width: "30px" }}
                >
                  <DeleteIcon />
                </IconButton>
                <Typography color={"text.primary"}>
                  $<b>{item.price * item.quantity}</b>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>

      {cart.length !== 0 ? (
        <>
          <Stack alignItems={"flex-end"} mt={2}>
            <Typography variant="h4" color={"text.primary"}>
              Total: {calculateCartTotal()}{" "}
            </Typography>
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
            <Button variant="contained" color="success">
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
