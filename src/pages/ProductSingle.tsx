import {
  Breadcrumbs,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import { addToCart } from "../redux/slices/cartSlice";
import Link from "@mui/material/Link";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { Color, Product, Size, Variant } from "../types/generalTypes";
import bearSorry from "../assets/images/bearSorry.png";

export default function ProductSingle() {
  const [item, setItem] = useState<Product>();
  const [activeImage, setActiveImage] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [variantQuantity, setVariantQuantity] = useState<number | null>(null);
  const [chosenVariant, setChosenVariant] = useState<Variant | null>(null);
  const { isMediumScreen, isLargeScreen } = useScreenSizes();
  const params = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5173/api/products/${params.productId}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        if (response.data.images.length > 0) {
          setActiveImage(response.data.images[0].url);
        } else {
          setActiveImage("");
        }
        setError(null); // Reset error state in case of successful response
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("Product not found."); // Set a custom error message for 404
        } else {
          console.log(err);
          setError("An error occurred while fetching the product.");
        }
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
    if (item && chosenVariant) {
      const simplifiedVariant = {
        color: chosenVariant.color,
        size: chosenVariant.size,
        id: chosenVariant.id,
      };
      const itemWithChosenVariant = {
        ...item,
        variants: [simplifiedVariant],
      };

      dispatch(
        addToCart({ product: itemWithChosenVariant, quantity: quantity })
      );
    } else {
      console.error("Item or variant not selected");
    }
  };

  return (
    <Stack
      alignItems={"center"}
      sx={{
        width: "100%",
        minHeight: "var(--body-min-height)",
        padding: isLargeScreen ? "20px 40px" : "20px 200px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {error ? (
        <Stack
          alignItems={"center"}
          sx={{
            width: "100%",
          }}
        >
          <img
            src={bearSorry}
            style={{ height: "300px", maxWidth: "100%", margin: "20px 0" }}
            alt="bear-sorry"
          />
          <Typography color={"text.primary"} fontSize={"2em"}>
            {error}
          </Typography>
          <Typography color={"text.primary"} fontSize={"2em"}>
            We are sorry for the inconvenience.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go back to Home page
          </Button>
        </Stack>
      ) : (
        <>
          <Stack
            direction={"column"}
            justifyContent={"center"}
            gap={isMediumScreen ? "20px" : "10px"}
            sx={{
              width: "100%",
            }}
          >
            <Stack
              alignItems={"flex-start"}
              sx={{
                width: "100%",
              }}
            >
              <Breadcrumbs>
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>

                <Typography color={"text.primary"}>
                  Product #{item?.id}
                </Typography>
              </Breadcrumbs>
            </Stack>

            <Stack
              direction={isMediumScreen ? "column" : "row"}
              gap={"30px"}
              justifyContent={"center"}
              sx={{
                width: "100%",
              }}
            >
              <Stack flexGrow={1} alignItems={"center"}>
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
                        src={`${image.url}`}
                        alt={`item-${index}`}
                        loading="lazy"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "20px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => setActiveImage(image.url)}
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </Stack>
              <Stack
                justifyContent={"space-evenly"}
                alignItems={isMediumScreen ? "center" : "flex-start"}
                flexGrow={2}
                gap={isMediumScreen ? "30px" : "30px"}
              >
                <Typography variant="h3" color={"text.primary"}>
                  {item?.title}
                </Typography>
                <Typography variant="body1" color={"text.primary"}>
                  {item?.description}
                </Typography>
                <Stack gap={"15px"}>
                  <Typography variant="h5" color={"text.primary"}>
                    Variants
                  </Typography>
                  <Stack direction={"row"} gap={"10px"} flexWrap={"wrap"}>
                    {item?.variants.map((variant) => (
                      <Button
                        variant={
                          variant.id == chosenVariant?.id
                            ? "contained"
                            : "outlined"
                        }
                        color={
                          variant.id == chosenVariant?.id
                            ? "warning"
                            : "primary"
                        }
                        key={variant.id}
                        onClick={() => {
                          setChosenVariant(variant);
                          setVariantQuantity(variant.quantity);
                        }}
                      >
                        {Color[variant.color]} - {Size[variant.size]}
                      </Button>
                    ))}
                  </Stack>
                  {chosenVariant ? (
                    <Typography color={"text.primary"}>
                      Remaining in stock: {variantQuantity}
                    </Typography>
                  ) : (
                    <>Choose a variant to add to cart:</>
                  )}
                </Stack>
                <Typography variant="h3" color={theme.palette.warning.main}>
                  ${item?.price}
                </Typography>
                <Stack
                  direction={"row"}
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
                    <Button
                      variant="contained"
                      onClick={handleDecreaseQuantity}
                    >
                      <ArrowDownwardIcon />
                    </Button>
                    <Typography color={"text.primary"}>
                      <b>{quantity}</b>
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleIncreaseQuantity}
                    >
                      <ArrowUpwardIcon />
                    </Button>
                  </Stack>
                  <Button
                    variant={chosenVariant ? "contained" : "outlined"}
                    color={chosenVariant ? "success" : "primary"}
                    sx={{ width: isMediumScreen ? "100%" : "15vw" }}
                    onClick={
                      chosenVariant ? () => handleAddToCart() : undefined
                    }
                  >
                    Add to cart
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
}
