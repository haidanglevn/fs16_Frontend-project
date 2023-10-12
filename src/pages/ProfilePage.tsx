import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  logoutUser,
  selectAccessToken,
  selectUser,
} from "../redux/slices/userSlice";
import { User } from "../types/userSlice";
import { Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import { useScreenSizes } from "../hooks/useScreenSizes";

export default function ProfilePage() {
  const user: User | null = useSelector(selectUser);
  const accessToken: string = useSelector(selectAccessToken);
  const { isMediumScreen, isLargeScreen } = useScreenSizes();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch, accessToken]);

  return (
    <Stack
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      gap={"10px"}
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 70px)",
        padding: isLargeScreen ? "20px 40px" : "20px 15vw",
      }}
    >
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>

        <Typography color="text.primary">Profile</Typography>
      </Breadcrumbs>

      <Stack
        direction={isMediumScreen ? "column" : "row"}
        gap={"40px"}
        sx={{ width: "100%" }}
      >
        <Stack
          direction={isMediumScreen ? "row" : "column"}
          sx={{ width: "max-content", border: "1px solid black" }}
        >
          <Stack
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            sx={{
              borderBottom: "1px solid black",
              padding: "20px",
            }}
          >
            <AccountCircleIcon />
            <Typography>
              <b>Your Profile</b>
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            sx={{
              borderBottom: "1px solid black",
              padding: "20px",
            }}
          >
            <ArticleIcon />
            <Typography>Your Orders</Typography>
          </Stack>
        </Stack>

        <Stack gap={"20px"} sx={{ width: "100%", padding: "0 20px" }}>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              paddingBottom: "40px",
            }}
          >
            <Stack>
              <Typography variant="h5">
                <b>Avatar</b>
              </Typography>
              <img
                src={user?.avatar}
                alt="avatar"
                style={{ height: "150px", width: "150px", borderRadius: "50%" }}
              />
            </Stack>
            <Button variant="contained" sx={{ height: "50px" }}>
              Edit
            </Button>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              paddingBottom: "40px",
            }}
          >
            <Stack>
              <Typography variant="h5">
                <b>Display name</b>
              </Typography>
              <Typography variant="body1">{user?.name}</Typography>
            </Stack>
            <Button variant="contained">Edit</Button>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              paddingBottom: "40px",
            }}
          >
            <Stack>
              <Typography variant="h5">
                <b>Email</b>
              </Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Stack>
            <Button variant="contained">Edit</Button>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              paddingBottom: "40px",
            }}
          >
            <Stack>
              <Typography variant="h5">
                <b>Password</b>
              </Typography>
            </Stack>
            <Button variant="contained">Change</Button>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ width: "20%" }}
              onClick={() => handleLogOut()}
            >
              Log Out
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/profile/admin")}
            >
              Admin Panel
            </Button>
            <Button variant="contained" color="success" sx={{ width: "20%" }}>
              Save
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
