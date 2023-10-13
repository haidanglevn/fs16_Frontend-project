import {
  Breadcrumbs,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import { addToCart } from "../redux/slices/cartSlice";
import Link from "@mui/material/Link";
import { useScreenSizes } from "../hooks/useScreenSizes";

export default function ProductSingle() {
  const [item, setItem] = useState<Product>();
  const [activeImage, setActiveImage] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const { isMediumScreen, isLargeScreen } = useScreenSizes();
  const params = useParams();
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${params.productId}`)
      .then((response) => {
        setItem(response.data);
        setActiveImage(response.data.images[0]);
      });
  }, [params.productId]);

  const dispatch = useDispatch<AppDispatch>();

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    if (item) {
      dispatch(addToCart({ product: item, quantity: quantity }));
    } else return;
  };

  return (
    <Stack
      alignItems={"flex-start"}
      sx={{
        width: "100%",
        minHeight: "var(--body-min-height)",
        padding: isLargeScreen ? "20px 40px" : "20px 200px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>

        <Typography color={"text.primary"}>Product #{item?.id}</Typography>
      </Breadcrumbs>
      <Stack
        direction={isMediumScreen ? "column" : "row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"50px"}
      >
        <Stack>
          <img
            src={activeImage}
            alt="active-img"
            style={{
              width: isMediumScreen ? "80vw" : "500px",
              height: isMediumScreen ? "400px" : "500px",
              borderRadius: "20px",
            }}
          ></img>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={"10px"}
            mt={3}
          >
            {item?.images.map((image, index) => {
              return (
                <img
                  src={`${image}`}
                  alt={`item-${index}`}
                  loading="lazy"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setActiveImage(image)}
                  key={index}
                />
              );
            })}
          </Stack>
        </Stack>
        <Stack justifyContent={"space-evenly"} sx={{ height: "50vh" }}>
          <Typography variant="h2" color={"text.primary"}>
            {item?.title}
          </Typography>
          <Typography variant="body1" color={"text.primary"}>
            {item?.description}
          </Typography>
          <Typography variant="h3" color={"text.primary"}>
            ${item?.price}
          </Typography>
          <Stack
            direction={isMediumScreen ? "column" : "row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            gap={"50px"}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"30px"}
            >
              <Button variant="contained" onClick={handleDecreaseQuantity}>
                <ArrowDownwardIcon />
              </Button>
              <Typography color={"text.primary"}>
                <b>{quantity}</b>
              </Typography>
              <Button variant="contained" onClick={handleIncreaseQuantity}>
                <ArrowUpwardIcon />
              </Button>
            </Stack>
            <Button
              variant="contained"
              color="success"
              sx={{ width: isMediumScreen ? "100%" : "15vw" }}
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
