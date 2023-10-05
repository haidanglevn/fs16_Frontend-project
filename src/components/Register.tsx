import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  selectAllUsers,
  selectError,
} from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const allUsers = useSelector(selectAllUsers);

  const navigate = useNavigate();

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
      const emailExists = allUsers.some(
        (user) => user.email === formData.email
      );

      // Check the result
      if (emailExists) {
        emailError = "Email is already in use.";
        setFormErrors({ ...formErrors, email: "Email is already in use." });
        return;
      } else {
        console.log("registering.....");
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/users/",
          formData
        );
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
    <Container component="main" maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" p={3}>
        <Typography component="h1">Register</Typography>
        <Box component="form" onSubmit={handleSubmit} mt={1} width="100%">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={formData.name}
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
      </Box>
    </Container>
  );
};

export default Register;
