import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useScreenSizes } from "../hooks/useScreenSizes";
import bearSorry from "../assets/images/bearSorry.png";
import AdminProductPanel from "../components/AdminProductPanel";
import { useEffect, useState } from "react";
import AdminUserPanel from "../components/AdminUserPanel";
import AdminOrderPanel from "../components/AdminOrderPanel";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectAccessToken } from "../redux/slices/userSlice";
import { User } from "../types/generalTypes";
import { toast } from "react-toastify";

type AdminPanel = "products" | "users" | "orders";

export default function AdminPage() {
  const theme = useTheme();
  const { isSmallScreen, isLargeScreen, isMediumScreen } = useScreenSizes();
  const [currentPanel, setCurrentPanel] = useState<AdminPanel>("products");
  const navigate = useNavigate();

  const handleChangePanel = (panel: AdminPanel) => {
    setCurrentPanel(panel);
  };

  const renderPanel = () => {
    switch (currentPanel) {
      case "products":
        return <AdminProductPanel />;
      case "users":
        return <AdminUserPanel />;
      case "orders":
        return <AdminOrderPanel />;

      default:
        return <AdminProductPanel />;
    }
  };
  return (
    <Stack
      alignItems={"center"}
      sx={{
        width: "100%",
        minHeight: "var(--body-min-height)",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {isSmallScreen ? (
        <Stack
          alignItems={"center"}
          sx={{
            minHeight: "var(--body-min-height)",
            padding: "20px 40px",
            textAlign: "left",
          }}
        >
          <Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
            <Typography color={"text.primary"}>
              Admin panel is only available for tablet and desktop screen. Try
              rotate your screen or open this page in a bigger screen.
            </Typography>
            <img
              src={bearSorry}
              style={{ height: "300px", maxWidth: "100%", margin: "20px 0" }}
              alt="bear-sorry"
            />
            <Typography color={"text.primary"}>
              We are sorry for the inconvenience.
            </Typography>
          </Stack>
          <Stack></Stack>
        </Stack>
      ) : (
        // Add other panel here
        <>
          <Stack
            direction={isMediumScreen ? "column" : "row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            p={"0 100px"}
            sx={{
              borderBottom: "2px solid orange",
            }}
          >
            <Typography variant="h4" color={"text.primary"}>
              Admin Page
            </Typography>
            <Stack direction={"row"} gap={"100px"} margin={"30px 0"}>
              <Button
                variant="contained"
                onClick={() => handleChangePanel("users")}
                color={currentPanel == "users" ? "success" : "primary"}
              >
                Users
              </Button>
              <Button
                variant="contained"
                onClick={() => handleChangePanel("products")}
                color={currentPanel == "products" ? "success" : "primary"}
              >
                Products
              </Button>
              <Button
                variant="contained"
                onClick={() => handleChangePanel("orders")}
                color={currentPanel == "orders" ? "success" : "primary"}
              >
                Orders
              </Button>
            </Stack>
          </Stack>
          {renderPanel()}
        </>
      )}
    </Stack>
  );
}
