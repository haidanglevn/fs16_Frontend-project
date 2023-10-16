import { Button, Stack, Typography } from "@mui/material";
import EmptyCart from "../assets/images/empty-cart.png";
import { useNavigate } from "react-router-dom";
export default function CartEmpty() {
  const navigate = useNavigate();
  return (
    <Stack alignItems={"center"} gap={2}>
      <img src={EmptyCart} alt="empty-cart" height={"300px"} />
      <Typography color={"text.primary"}>
        Your cart is feeling lonely. Why not give it some company with our
        awesome products?
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Browse all products
      </Button>
    </Stack>
  );
}
