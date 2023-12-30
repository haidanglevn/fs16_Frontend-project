import { Stack, Typography, Button, Box, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { User } from "../types/generalTypes";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { AdminCreateUserModal } from "./AdminCreateUserModal";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminUserPanel() {
  const [users, setUsers] = useState<User[] | []>([]);
  const access_token = useSelector(
    (state: RootState) => state.user.access_token
  );
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  // Create User Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Delete User Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = (deletingUserId: string) => {
    axios
      .delete(`${API_BASE_URL}/users/${deletingUserId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        toast.success("[ADMIN] User deleted successfully!");
        fetchUsers();
        handleCloseDeleteModal();
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  const fetchUsers = () => {
    axios
      .get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        setUsers(res.data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: isMediumScreen ? 90 : 130 },
    {
      field: "role",
      headerName: "Role",
      width: isMediumScreen ? 50 : 130,
      valueGetter: (params: any) =>
        params.row.role === 1 ? "Admin" : "Customer",
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: isMediumScreen ? 50 : 130,
      renderCell: (params: any) => (
        <img
          src={params.value}
          alt="avatar"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "firstName",
      headerName: "First name",
      width: isMediumScreen ? 90 : 130,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: isMediumScreen ? 90 : 130,
    },
    { field: "email", headerName: "Email", width: isMediumScreen ? 150 : 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params: any) => (
        <div>
          <Button
            variant="contained"
            color={"primary"}
            sx={{ marginRight: "5px" }}
            onClick={() => setEditingUser(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDeletingUser(params.row);
              handleOpenDeleteModal();
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Stack alignItems={"center"} gap={"20px"} sx={{ padding: "20px 0" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Typography variant="h5" color={"text.primary"}>
            User panel
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenCreateModal()}
          >
            Create new user
          </Button>
        </Stack>
        <DataGrid rows={users} columns={columns} />
        <AdminCreateUserModal
          open={isCreateModalOpen}
          handleClose={handleCloseCreateModal}
          fetchUsers={fetchUsers}
        />

        <Modal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            {deletingUser ? (
              <>
                <Typography variant="h5">
                  Are you sure to delete this user?
                </Typography>
                <Stack sx={{ padding: "20px 0" }}>
                  <Typography>Product ID: {deletingUser.id}</Typography>
                  <Typography>Email: {deletingUser.email}</Typography>
                  <Typography>LastName: {deletingUser.lastName}</Typography>
                  <Typography>FirstName: {deletingUser.lastName}</Typography>
                </Stack>
                <Stack gap={"10px"}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteUser(deletingUser.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      </Stack>
    </>
  );
}

export default AdminUserPanel;
