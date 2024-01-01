import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  logoutUser,
  selectAccessToken,
  selectUser,
} from "../redux/slices/userSlice";
import { UserUpdateBody } from "../types/userSlice";
import {
  Box,
  Breadcrumbs,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useScreenSizes } from "../hooks/useScreenSizes";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../types/generalTypes";
import YourProfilePanel from "../components/YourProfilePanel";
import YourAddressesPanel from "../components/YourAddressesPanel";
import YourOrdersPanel from "../components/YourOrdersPanel";

type ShowingPanel = "profile" | "addresses" | "orders";

export default function ProfilePage() {
  const { isMediumScreen, isLargeScreen } = useScreenSizes();
  const dispatch = useDispatch<AppDispatch>();
  const [showingPanel, setShowingPanel] = useState<ShowingPanel>("profile");
  const navigate = useNavigate();
  const theme = useTheme();

  const renderPanel = () => {
    switch (showingPanel) {
      case "profile":
        return <YourProfilePanel />;
      case "addresses":
        return <YourAddressesPanel />;
      case "orders":
        return <YourOrdersPanel />;

      default:
        return <YourProfilePanel />;
    }
  };
  return (
    <Stack
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      gap={"10px"}
      sx={{
        width: "100%",
        minHeight: "var(--body-min-height)",
        padding: isLargeScreen ? "20px 40px" : "20px 15vw",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>

        <Typography color={"text.primary"}>Profile</Typography>
      </Breadcrumbs>

      <Stack
        direction={isMediumScreen ? "column" : "row"}
        gap={"40px"}
        sx={{ width: "100%", minHeight: "80vh" }}
      >
        <Stack
          direction={isMediumScreen ? "row" : "column"}
          flexWrap={"wrap"}
          sx={{
            width: isMediumScreen ? "100%" : "20%",
            border: `1px solid ${theme.palette.text.primary}`,
          }}
        >
          <Stack
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            onClick={() => setShowingPanel("profile")}
            sx={{
              borderBottom: `1px solid ${theme.palette.text.primary}`,
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <AccountCircleIcon sx={{ color: "text.primary" }} />
            <Typography
              color={"text.primary"}
              sx={{ fontWeight: showingPanel == "profile" ? "bold" : "" }}
            >
              Your Profile
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            onClick={() => setShowingPanel("orders")}
            sx={{
              borderBottom: `1px solid ${theme.palette.text.primary}`,
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <ArticleIcon sx={{ color: "text.primary" }} />
            <Typography
              color={"text.primary"}
              sx={{ fontWeight: showingPanel == "orders" ? "bold" : "" }}
            >
              Your Orders
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            onClick={() => setShowingPanel("addresses")}
            sx={{
              borderBottom: `1px solid ${theme.palette.text.primary}`,
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <HomeWorkIcon sx={{ color: "text.primary" }} />
            <Typography
              color={"text.primary"}
              sx={{ fontWeight: showingPanel == "addresses" ? "bold" : "" }}
            >
              Your Addresses
            </Typography>
          </Stack>
        </Stack>
        {renderPanel()}
      </Stack>
    </Stack>
  );
}
