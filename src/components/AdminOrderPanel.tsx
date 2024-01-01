import React, { useEffect, useState } from "react";
import { Order } from "../types/generalTypes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useScreenSizes } from "../hooks/useScreenSizes";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminOrderPanel() {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const access_token = useSelector(
    (state: RootState) => state.user.access_token
  );
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();

  const fetchOrders = () => {
    axios
      .get(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        setOrders(res.data);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", width: isMediumScreen ? 90 : 150 },
    {
      field: "userId",
      headerName: "User ID",
      width: isMediumScreen ? 90 : 150,
    },
    {
      field: "addressId",
      headerName: "Address ID",
      width: isMediumScreen ? 90 : 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      valueGetter: (params: any) => {
        switch (params.row.status) {
          case 0:
            return "Pending";
          case 1:
            return "Shipping";
          case 2:
            return "Received";

          default:
            return "Pending";
        }
      },
    },
    {
      field: "orderItems",
      headerName: "Items",
      width: 10,
      valueGetter: (params: any) => {
        return params.row.orderItems.length;
      },
    },
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
          >
            Edit
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Stack alignItems={"center"} gap={"20px"} sx={{ padding: "20px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ width: "100%" }}
      >
        <Typography variant="h5" color={"text.primary"}>
          Order panel
        </Typography>
      </Stack>
      <DataGrid rows={orders} columns={columns} />
    </Stack>
  );
}

export default AdminOrderPanel;
