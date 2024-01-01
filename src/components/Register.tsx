import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectAllUsers } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";
import { useScreenSizes } from "../hooks/useScreenSizes";

// ### Create New User (For all)
// POST http://localhost:5173/api/users
// Content-Type: application/json

// {
//   "firstName": "New",
//   "lastName": "Man",
//   "email": "newman2@mail.com",
//   "password": "Password123",
//   "avatar":"https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// }

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
  });
  const [emailAvailable, setEmailAvailable] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const allUsers = useSelector(selectAllUsers);

  const navigate = useNavigate();
  const theme = useTheme();
  const { isMediumScreen } = useScreenSizes();

  const validate = () => {
    let isValid = true;
    const errors = {
      email: "",
      password: "",
      passwordConfirmation: "",
    };

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!validate()) {
        return; // Stop here if the form data is not valid
      }
      let emailError: string | null = null;
      await axios
        .post(`${API_BASE_URL}/users/is-available`, { email: formData.email })
        .then((res) => {
          console.log("res: ", res.data);
          setEmailAvailable(res.data);
        });

      // Check the result
      if (!emailAvailable) {
        emailError = "Email is already in use.";
        setFormErrors({ ...formErrors, email: "Email is already in use." });
        return;
      } else {
        const response = await axios.post(`${API_BASE_URL}/users/`, formData);
        toast.success(
          "Register successfully! Please login with your new account."
        );
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <Stack
      sx={{
        alignItems: "center",
        padding: "20px 0",
        minHeight: "var(--body-min-height)",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography component="h1" color={"text.primary"} variant="h3">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        mt={1}
        width={isMediumScreen ? "80%" : "50%"}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoFocus
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoFocus
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          error={!!formErrors.email}
          helperText={formErrors.email}
          value={formData.email}
          onChange={handleChange}
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
          error={!!formErrors.password}
          helperText={formErrors.password}
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label="Retype password"
          error={!!formErrors.passwordConfirmation}
          helperText={formErrors.passwordConfirmation}
          value={formData.passwordConfirmation}
          onChange={handleChange}
          type="password"
          id="passwordConfirmation"
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </Stack>
  );
};

export default Register;
