import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectError } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const loginPayload = { email, password };
    dispatch(loginUser(loginPayload));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography color={"red"}>{errorMessage}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don't have an account? Register
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;

/* Flow:
- User logs in with Username/Password.
- Server returns Access Token and Refresh Token.
- Access Token is used for making authorized API requests.
- Once the Access Token expires, the Refresh Token is used to obtain a new Access Token.
- If the Refresh Token is also expired, the user has to log in again. */
