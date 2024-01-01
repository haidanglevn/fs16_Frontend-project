import { emptyCart, selectCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/cartSlice";

import {
  Typography,
  Stack,
  useTheme,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { Address, Color, Size, User } from "../types/generalTypes";
import axios from "axios";
import { useState, useEffect, ReactElement } from "react";
import { selectAccessToken } from "../redux/slices/userSlice";
import AddressCard from "../components/AddressCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoneyIcon from "@mui/icons-material/Money";
import PaymentIcon from "@mui/icons-material/Payment";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PaymentCard from "../components/PaymentCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface PaymentMethod {
  name: string;
  icon: ReactElement;
}
const paymentMethods: PaymentMethod[] = [
  {
    name: "Cash on Delivery",
    icon: <MoneyIcon />,
  },
  {
    name: "Credit Card",
    icon: <PaymentIcon />,
  },
  {
    name: "Gift Card",
    icon: <CardGiftcardIcon />,
  },
];

export default function CreateOrderPage() {
  const cart = useSelector(selectCart);
  const theme = useTheme();
  const { isMediumScreen } = useScreenSizes();
  const [user, setUser] = useState<User | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const accessToken: string | null = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    message: "Processing your order...",
    icon: <CircularProgress />,
  });

  const isPurchaseEnabled = selectedAddress && selectedPaymentMethod;

  const handlePurchaseClick = () => {
    submitOrder();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const prepareOrderPayload = () => {
    return {
      userId: user?.id, // Assuming 'user' object has the 'id' property
      addressId: selectedAddress?.id, // Assuming 'selectedAddress' object has the 'id' property
      orderItems: cart.map((item) => ({
        productId: item.id,
        variantId: item.variants[0].id, // Assuming you're only dealing with the first variant
        quantity: item.quantity,
        price: item.price, // Assuming you want to send the item price
      })),
    };
  };

  const submitOrder = async () => {
    setIsModalOpen(true); // Show the modal with the loading state

    try {
      const payload = prepareOrderPayload();
      console.log("Payload: ", payload);
      const response = await axios.post(`${API_BASE_URL}/orders`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setTimeout(() => {
        if (response.status === 201) {
          dispatch(emptyCart());
          // Update the modal content to show success message
          setModalContent({
            message: "Order placed successfully!",
            icon: <CheckCircleIcon style={{ color: "green", fontSize: 40 }} />,
          });

          // Close the modal after 3 seconds
          setTimeout(() => {
            setIsModalOpen(false);
            navigate("/");
          }, 3000);
        }
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      // Optionally update the modal to show an error message
      setModalContent({
        message: "Failed to place order. Please try again.",
        icon: <ErrorIcon style={{ color: "red", fontSize: 40 }} />,
      });
    }
  };

  const calculateCartTotal = () => {
    let total = 0;
    cart.map((item) => {
      return (total += item.price * item.quantity);
    });
    return `$${total}`;
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };
  const handleSelectPaymentMethod = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("User: ", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        toast.error(
          "Error: failed to fetch user data. Please try log in again!"
        );
        navigate("/login");
      });
  }, []);

  return (
    <Stack
      sx={{
        padding: isMediumScreen ? "20px" : "0px 100px 40px 100px",
        minHeight: "var(--body-min-height)",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" color={"text.primary"} margin={"20px 0"}>
        Let's review your order:
      </Typography>
      <Stack sx={{ border: "1px solid gray", padding: "30px" }}>
        <Typography variant="h5" color={"text.primary"}>
          Cart ({cart.length}):
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
              key={item.variants[0].id}
            >
              <img
                src={item.images[0].url}
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
                    {item.title} - ({Size[item.variants[0].size]} /{" "}
                    {Color[item.variants[0].color]})
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
                    <Typography color={"text.primary"}>
                      Quantity: {item.quantity}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems={"flex-end"}>
                  <Typography color={"text.primary"}>
                    $<b>{item.price * item.quantity}</b>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
          <Stack alignItems={"flex-end"}>
            <Typography variant="h5" color={"text.primary"}>
              Total: {calculateCartTotal()}{" "}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography variant="h4" color={"text.primary"} margin={"20px 0"}>
        Choose your shipping address:
      </Typography>
      <Stack sx={{ border: "1px solid gray", padding: "30px" }}>
        <Typography variant="h5" color={"text.primary"}>
          Address ({user?.addresses.length}):
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          mt={5}
          gap={"20px"}
        >
          {user?.addresses.length == 0 && (
            <Stack>
              <Typography variant="body1" color={"error"}>
                You haven't added any address yet. Please add one to continue!
              </Typography>
            </Stack>
          )}
          {user?.addresses.map((address, index) => {
            return (
              <AddressCard
                key={index}
                address={address}
                isSelected={selectedAddress === address}
                onSelect={handleSelectAddress}
              />
            );
          })}
          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            color="success"
            sx={{
              height: "50px",
            }}
          >
            <Typography>Create New Address</Typography>
          </Button>
        </Stack>
      </Stack>
      <Typography variant="h4" color={"text.primary"} margin={"20px 0"}>
        Choose your payment method:
      </Typography>
      <Stack
        direction={"row"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={"20px"}
        sx={{ border: "1px solid gray", padding: "30px" }}
      >
        {paymentMethods.map((method, index) => {
          return (
            <PaymentCard
              key={index}
              method={method}
              isSelected={selectedPaymentMethod === method}
              onSelect={handleSelectPaymentMethod}
            />
          );
        })}
      </Stack>
      <Button
        variant="contained"
        color="primary"
        disabled={!isPurchaseEnabled}
        onClick={handlePurchaseClick}
        sx={{ marginTop: "30px" }}
      >
        Purchase
      </Button>
      {/* Processing Order Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="order-status"
        aria-describedby="order-status-description"
      >
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            alignItems: "center",
          }}
        >
          {modalContent.icon}
          <Typography
            id="order-status"
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}
          >
            {modalContent.message}
          </Typography>
        </Stack>
      </Modal>
    </Stack>
  );
}
