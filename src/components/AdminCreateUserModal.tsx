import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { toast, ToastContainer } from "react-toastify";

export const AdminCreateUserModal = ({
  open,
  handleClose,
  fetchUsers,
}: any) => {
  const access_token = useSelector(
    (state: RootState) => state.user.access_token
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: 0, // Default to Customer
    avatar: "https://picsum.photos/1000/1000?random=150",
  });
  const [error, setError] = useState("");

  const { isMediumScreen } = useScreenSizes();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      // Set an error and prevent the API call
      setError("Please fill in all fields.");
      return;
    }

    // If no field is empty, proceed to make the API call
    setError(""); // Clear any existing errors

    try {
      const response = await axios.post(
        "http://localhost:5173/api/users/admin/create-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // Replace with your real token
          },
        }
      );
      // Handle success response
      toast.success("[ADMIN] User created successfully!");
      fetchUsers();
      handleClose(); // Close the modal
    } catch (error: any) {
      // Handle error response
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMediumScreen ? 600 : 1000,
          height: 700,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4">Create New User</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={0}>Customer</MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="avatar"
            label="Avatar URL"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.avatar}
            onChange={handleChange}
          />
          <Stack gap={"20px"} sx={{ paddingTop: "30px" }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Create
            </Button>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
