import {
  Stack,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useScreenSizes } from "../hooks/useScreenSizes";
import {
  selectUser,
  selectAccessToken,
  logoutUser,
  fetchUserProfile,
} from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";
import { User } from "../types/generalTypes";
import { UserUpdateBody } from "../types/userSlice";

type EditingMode = "firstName" | "lastName" | "avatar" | "email" | "password";
interface ModalContentProps {
  prompt: string;
  editing: EditingMode;
}

interface UserChangePasswordBody {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function YourProfilePanel() {
  const user: User | null = useSelector(selectUser);
  const accessToken: string | null = useSelector(selectAccessToken);
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();

  /* States for edit mode */
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [newFirstName, setNewFirstName] = useState<string | null>(null);
  const [newLastName, setNewLastName] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [oldPasswordInput, setOldPasswordInput] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string | null>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentProps>();
  const [modalError, setModalError] = useState<string | null>(null);

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch, accessToken]);

  const handleOpenModal = (mode: EditingMode) => {
    const modalContent: ModalContentProps = {
      prompt: `Changing ${mode}: `,
      editing: mode,
    };
    setModalContent(modalContent);
    setModalError(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    resetForm();
    setModalError(null);
  };

  const resetForm = () => {
    setNewFirstName(null);
    setNewLastName(null);
    setNewEmail(null);
    setNewAvatar(null);
    setOldPasswordInput(null);
    setNewPassword(null);
    setNewPasswordConfirm(null);
  };

  const validate = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    switch (modalContent?.editing) {
      case "avatar":
        if (newAvatar === null) {
          setModalError("Avatar field cannot be empty!");
          return false;
        }
        break;
      case "firstName":
        if (newFirstName === null) {
          setModalError("Name field cannot be empty!");
          return false;
        }
        break;
      case "lastName":
        if (newLastName === null) {
          setModalError("Name field cannot be empty!");
          return false;
        }
        break;
      case "email":
        if (newEmail === null) {
          setModalError("Email field cannot be empty!");
          return false;
        } else if (!emailRegex.test(newEmail)) {
          setModalError("Please enter a valid email.");
          return false;
        }
        break;
      case "password":
        if (!oldPasswordInput || !newPassword || !newPasswordConfirm) {
          setModalError("All password fields must be filled!");
          return false;
        } else if (oldPasswordInput !== user?.password) {
          setModalError("Current password is incorrect, please check again!");
          return false;
        } else if (newPassword !== newPasswordConfirm) {
          setModalError("New passwords don't match, please check again!");
          return false;
        }
        break;
      default:
        break;
    }

    return true;
  };

  const renderModalTextField = (mode: EditingMode) => {
    switch (mode) {
      case "avatar":
        return (
          <TextField
            onChange={(e) => setNewAvatar(e.target.value)}
            placeholder={user?.avatar}
          />
        );
      case "firstName":
        return (
          <TextField
            onChange={(e) => setNewFirstName(e.target.value)}
            placeholder={user?.firstName}
          />
        );
      case "lastName":
        return (
          <TextField
            onChange={(e) => setNewLastName(e.target.value)}
            placeholder={user?.lastName}
          />
        );
      case "email":
        return (
          <TextField
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={user?.email}
          />
        );
      case "password":
        return (
          <>
            <TextField
              type="password"
              onChange={(e) => setOldPasswordInput(e.target.value)}
              placeholder="Enter your current password"
              required
            />
            <TextField
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
            <TextField
              type="password"
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              placeholder="Re-enter your new password again"
              required
            />
          </>
        );
    }
  };

  const handleUpdateUser = () => {
    const test = validate();
    if (test) {
      const body: UserUpdateBody = {
        firstName: newFirstName ? newFirstName : user!.firstName,
        lastName: newLastName ? newLastName : user!.lastName,
        email: newEmail ? newEmail : user!.email,
        // password: newPassword ? newPassword : user!.password,
        avatar: newAvatar ? newAvatar : user!.avatar,
      };
      axios
        .patch(`${API_BASE_URL}/users/profile`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setTimeout(() => {
            toast.success(`Update user id ${response.data.id} info success!`);
            setModalError(null);
            setModalOpen(false);
            dispatch(fetchUserProfile());
            resetForm();
            if (modalContent?.editing === "email") {
              handleLogOut();
            }
          }, 1000);
        })
        .catch((err) => setModalError(err.response.data.message));
    } else return;
  };

  const handleChangePassword = () => {
    const body: UserChangePasswordBody = {
      currentPassword: oldPasswordInput ? oldPasswordInput : "",
      newPassword: newPassword ? newPassword : "",
      confirmNewPassword: newPasswordConfirm ? newPasswordConfirm : "",
    };
    axios
      .post(`${API_BASE_URL}/users/change-password`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response) {
          toast.success(`Change password succesfully, please login again!`);
          setModalError(null);
          setModalOpen(false);
          dispatch(fetchUserProfile());
          resetForm();
          handleLogOut();
        }
      })
      .catch((err) => setModalError(err.response.data.message));
  };

  return (
    <Stack sx={{ width: "100%" }}>
      {" "}
      <Stack gap={"20px"} sx={{ padding: "0 20px" }}>
        <Stack
          direction={"row"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="h4" color={"text.primary"}>
            Hello, {user?.firstName} {user?.lastName}
          </Typography>
        </Stack>

        {/* ---------------------------------------------------------------- */}
        <Stack
          direction={"row"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          sx={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.text.primary}`,
            paddingBottom: "40px",
          }}
        >
          <Stack>
            <Typography variant="h5" color={"text.primary"}>
              <b>Avatar</b>
            </Typography>
            <img
              src={user?.avatar}
              alt="avatar"
              style={{ height: "150px", width: "150px", borderRadius: "50%" }}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{ height: "50px" }}
            onClick={() => handleOpenModal("avatar")}
          >
            Edit
          </Button>
        </Stack>

        {/* ---------------------------------------------------------------- */}
        <Stack
          direction={"row"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          sx={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.text.primary}`,
            paddingBottom: "40px",
          }}
        >
          <Stack>
            <Typography variant="h5" color={"text.primary"}>
              <b>First name</b>
            </Typography>

            <Typography variant="body1" color={"text.primary"}>
              {user?.firstName}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            onClick={() => handleOpenModal("firstName")}
          >
            Edit
          </Button>
        </Stack>
        {/* ---------------------------------------------------------------- */}
        <Stack
          direction={"row"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          sx={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.text.primary}`,
            paddingBottom: "40px",
          }}
        >
          <Stack>
            <Typography variant="h5" color={"text.primary"}>
              <b>Last name</b>
            </Typography>

            <Typography variant="body1" color={"text.primary"}>
              {user?.lastName}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            onClick={() => handleOpenModal("lastName")}
          >
            Edit
          </Button>
        </Stack>

        {/* ---------------------------------------------------------------- */}
        <Stack
          direction={"row"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          sx={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.text.primary}`,
            paddingBottom: "40px",
          }}
        >
          <Stack>
            <Typography variant="h5" color={"text.primary"}>
              <b>Email</b>
            </Typography>
            <Typography variant="body1" color={"text.primary"}>
              {user?.email}
            </Typography>
          </Stack>
          <Button variant="contained" onClick={() => handleOpenModal("email")}>
            Edit
          </Button>
        </Stack>

        {/* ---------------------------------------------------------------- */}
        <Stack
          direction={"row"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          sx={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.text.primary}`,
            paddingBottom: "40px",
          }}
        >
          <Stack>
            <Typography variant="h5" color={"text.primary"}>
              <b>Password</b>
            </Typography>
            <Typography variant="body1" color={"text.primary"}>
              **********
            </Typography>
          </Stack>
          <Button
            variant="contained"
            onClick={() => handleOpenModal("password")}
          >
            Change
          </Button>
        </Stack>

        {/* BUTTONS ---------------------------------------------------------------- */}
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
          {user?.role === 1 && (
            <Button variant="contained" onClick={() => navigate("/admin")}>
              Admin Panel
            </Button>
          )}
        </Stack>
      </Stack>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMediumScreen ? "90%" : "70vw",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            padding: "50px",
          }}
        >
          {modalContent && (
            <Stack
              alignItems={"center"}
              direction={isSmallScreen ? "column" : "row"}
              gap={"20px"}
            >
              {modalContent.editing === "avatar" && (
                <img
                  src={newAvatar ? newAvatar : user?.avatar}
                  alt="avatar"
                  style={{
                    height: "150px",
                    width: "150px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <Stack sx={{ width: "100%" }}>
                <Typography variant="h4" color={"text.primary"}>
                  {modalContent.prompt}
                </Typography>
                {renderModalTextField(modalContent.editing)}
                {modalError && (
                  <Typography color={"text.primary"}>
                    Error: {modalError}
                  </Typography>
                )}

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{ padding: "20px 0", width: "100%" }}
                >
                  <Button
                    sx={{ width: "30%" }}
                    variant="contained"
                    color="error"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "30%" }}
                    variant="contained"
                    color="success"
                    onClick={
                      modalContent.editing == "password"
                        ? () => handleChangePassword()
                        : () => handleUpdateUser()
                    }
                  >
                    Save
                  </Button>
                </Stack>
                {modalContent.editing === "email" ||
                modalContent.editing === "password" ? (
                  <Typography color={"red"}>
                    By changing this information, you are prompted to re-login
                    for security reason.
                  </Typography>
                ) : (
                  ""
                )}
              </Stack>
            </Stack>
          )}
        </Box>
      </Modal>
    </Stack>
  );
}

export default YourProfilePanel;
