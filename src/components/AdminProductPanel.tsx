import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Product } from "../types/generalTypes";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import {
  createNewProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
  selectProducts,
} from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../redux/slices/categorySlice";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { useNavigate } from "react-router-dom";

const AdminProductPanel = () => {
  const products = useSelector(selectProducts);
  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false);

  const [deletingProduct, setDeletingProduct] = useState<Product>();
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState<number | string>("");
  const [currentImageLink, setCurrentImageLink] = useState<string>(
    "https://picsum.photos/200/300"
  );
  const [images, setImages] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleEditProduct = async (item: Product) => {
    if (editingProductId === null) {
      setEditingProductId(item.id);
    } else {
      const updatedItem: Product = { ...item, price: Number(item.price) };
      if (Number.isNaN(updatedItem.price)) {
        toast.error("Price is not a number, please try again");
      } else {
        dispatch(editProduct(updatedItem));
        setEditingProductId(null);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    dispatch(deleteProduct(id));
    setDeleteProductModalOpen(false);
    dispatch(fetchProducts());
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: isMediumScreen ? 50 : 200 },
    {
      field: "title",
      headerName: "Title",
      width: isLargeScreen ? 100 : 200,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.category.name}`,
    },
    {
      field: "price",
      headerName: "Price",
      width: 70,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: isLargeScreen ? 200 : 300,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color={editingProductId === params.row.id ? "success" : "primary"}
            sx={{ marginRight: "5px" }}
            onClick={() => handleEditProduct(params.row)}
          >
            {editingProductId === params.row.id ? "Save" : "Edit"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDeletingProduct(params.row);
              setDeleteProductModalOpen(true);
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
            Product panel
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/admin/create-product")}
          >
            Create new product
          </Button>
        </Stack>

        <DataGrid
          rows={products}
          columns={columns}
          pageSizeOptions={[25, 50, 100]}
          isCellEditable={(params) => {
            return editingProductId === params.id;
          }}
        />
      </Stack>
      <Modal
        open={deleteProductModalOpen}
        onClose={() => setDeleteProductModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {deletingProduct ? (
            <>
              <Typography variant="h5" color={"text.primary"}>
                Are you sure to delete this product?
              </Typography>
              <Stack sx={{ padding: "20px 0" }}>
                <Typography color={"text.primary"}>
                  Product ID: {deletingProduct.id}
                </Typography>
                <Typography color={"text.primary"}>
                  Title: {deletingProduct.title}
                </Typography>
                <Typography color={"text.primary"}>
                  Price: {deletingProduct.price}
                </Typography>
                <Typography color={"text.primary"}>
                  Category: {deletingProduct.category.name}
                </Typography>
                <Typography color={"text.primary"}>
                  Description: {deletingProduct.description}
                </Typography>
              </Stack>
              <Stack gap={"10px"}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteProduct(deletingProduct.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setDeleteProductModalOpen(false);
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
    </>
  );
};

export default AdminProductPanel;
