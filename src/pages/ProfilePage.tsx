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
import { useScreenSizes } from "../hooks/useScreenSizes";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../types/generalTypes";

type EditingMode = "name" | "avatar" | "email" | "password";
interface ModalContentProps {
  prompt: string;
  editing: EditingMode;
}

export default function ProfilePage() {
  const user: User | null = useSelector(selectUser);
  const accessToken: string | null = useSelector(selectAccessToken);
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();

  /* States for edit mode */
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
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
    setNewName(null);
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
      case "name":
        if (newName === null) {
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
      case "name":
        return (
          <TextField
            onChange={(e) => setNewName(e.target.value)}
            placeholder={user?.firstName}
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
        firstName: newName ? newName : user!.firstName,
        email: newEmail ? newEmail : user!.email,
        // password: newPassword ? newPassword : user!.password,
        avatar: newAvatar ? newAvatar : user!.avatar,
      };
      axios
        .patch(`http://localhost:5173/api/users/profile`, body, {
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
        sx={{ width: "100%" }}
      >
        <Stack
          direction={isMediumScreen ? "row" : "column"}
          sx={{
            width: "max-content",
            border: `1px solid ${theme.palette.text.primary}`,
          }}
        >
          <Stack
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            sx={{
              borderBottom: `1px solid ${theme.palette.text.primary}`,
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <AccountCircleIcon sx={{ color: "text.primary" }} />
            <Typography color={"text.primary"}>
              <b>Your Profile</b>
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            sx={{
              borderBottom: `1px solid ${theme.palette.text.primary}`,
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <ArticleIcon sx={{ color: "text.primary" }} />
            <Typography color={"text.primary"}>Your Orders</Typography>
          </Stack>
        </Stack>

        <Stack gap={"20px"} sx={{ width: "100%", padding: "0 20px" }}>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="h4" color={"text.primary"}>
              Hello, {user?.firstName}
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
                <b>Display name</b>
              </Typography>

              <Typography variant="body1" color={"text.primary"}>
                {user?.firstName}
              </Typography>
            </Stack>

            <Button variant="contained" onClick={() => handleOpenModal("name")}>
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
            <Button
              variant="contained"
              onClick={() => handleOpenModal("email")}
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
              <Button
                variant="contained"
                onClick={() => navigate("/profile/admin")}
              >
                Admin Panel
              </Button>
            )}
          </Stack>
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
                    onClick={() => handleUpdateUser()}
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
