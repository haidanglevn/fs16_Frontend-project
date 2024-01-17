import {
  Stack,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  useTheme,
  IconButton,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { selectUser, selectAccessToken } from "../redux/slices/userSlice";
import { Address, User } from "../types/generalTypes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function YourAddressesPanel() {
  const user: User | null = useSelector(selectUser);
  const accessToken: string | null = useSelector(selectAccessToken);
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const theme = useTheme();

  const fetchAddresses = () => {
    axios
      .get(`${API_BASE_URL}/addresses/by-userid/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res: any) => {
        console.log("Addresses: ", res.data);
        setAddresses(res.data);
      });
  };

  const handleDeleteAddresses = (addressId: string) => {
    axios
      .delete(`${API_BASE_URL}/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res: any) => {
        toast.success("Your address is deleted successfully");
        fetchAddresses();
      })
      .catch((err: any) => toast.error(err));
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <Stack sx={{ width: "100%" }}>
      <Typography variant="h4" color={"text.primary"}>
        Manage your addresses:
      </Typography>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={"10px"}
        p={"20px 0"}
        alignItems={"center"}
        justifyContent={isMediumScreen ? "center" : "flex-start"}
      >
        {addresses !== null ? (
          addresses.map((address) => {
            return (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                  border: "1px solid gray",
                  padding: "15px",
                  borderRadius: "20px",
                  width: isMediumScreen ? "100%" : "200px",
                }}
                key={address.id}
              >
                <Stack>
                  <Typography color={"text.primary"}>
                    {address.street}
                  </Typography>
                  <Typography color={"text.primary"}>
                    {address.state}
                  </Typography>
                  <Typography color={"text.primary"}>
                    {address.postalCode} {address.city}
                  </Typography>
                  <Typography color={"text.primary"}>
                    {address.country}
                  </Typography>
                </Stack>
                <Stack>
                  <IconButton
                    color="primary"
                    sx={{ borderRadius: "50%", border: "1px solid black" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    sx={{ borderRadius: "50%", border: "1px solid black" }}
                    onClick={() => handleDeleteAddresses(address.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            );
          })
        ) : (
          <Typography color={"text.primary"}>
            You currently have no addresses. Maybe try create one?
          </Typography>
        )}
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
  );
}

export default YourAddressesPanel;
