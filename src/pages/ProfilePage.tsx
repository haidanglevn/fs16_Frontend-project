import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  logoutUser,
  selectAccessToken,
  selectUser,
} from "../redux/slices/userSlice";
import { User } from "../types/userSlice";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user: User | null = useSelector(selectUser);
  const accessToken: string = useSelector(selectAccessToken);
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
    <div>
      {user ? (
        <Stack
          alignItems={"center"}
          gap={"30px"}
          sx={{
            padding: "20px 0",
          }}
        >
          <h1>User Profile</h1>
          <Card sx={{ width: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={user.avatar}
                alt="user avatar"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.role}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
          <Stack>
            {user.role === "customer" ? (
              <Button onClick={() => navigate("/profile/admin")}>
                Go to Admin Panel
              </Button>
            ) : (
              <Button onClick={() => navigate("/profile/admin")}>
                Go to Admin Panel
              </Button>
            )}
            <Button onClick={handleLogOut}>Log out</Button>
          </Stack>
        </Stack>
      ) : (
        <Login />
      )}
    </div>
  );
}
