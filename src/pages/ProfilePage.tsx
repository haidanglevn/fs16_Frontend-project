import Login from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  logoutUser,
  selectAccessToken,
  selectUser,
} from "../redux/slices/userSlice";
import { User } from "../types/types";
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

export default function ProfilePage() {
  const user: User | null = useSelector(selectUser);
  const accessToken: string = useSelector(selectAccessToken);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch, accessToken]);

  return (
    <div>
      {user ? (
        <Stack alignItems={"center"}>
          <h1>User Profile</h1>
          <Card sx={{ width: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={user.avatar}
                alt="green iguana"
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
          <Button onClick={handleLogOut}>Log out</Button>
        </Stack>
      ) : (
        <Login />
      )}
    </div>
  );
}
