import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectCategories,
  selectProducts,
} from "../redux/slices/productSlice";
import { Product } from "../types/types";
import { useState } from "react";
import axios from "axios";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";

export default function AdminPage() {
  const products = useSelector(selectProducts);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false);

  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState<number | string>("");
  const [currentImageLink, setCurrentImageLink] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const [deleteProduct, setDeleteProduct] = useState<Product>();
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleEditProduct = async (item: Product) => {
    if (editingProductId === null) {
      setEditingProductId(item.id);
    } else {
      const updatedItem: Product = { ...item, price: Number(item.price) };
      if (Number.isNaN(updatedItem.price)) {
        console.log("Price is not a number, please try again");
      } else {
        await axios
          .put(
            `https://api.escuelajs.co/api/v1/products/${editingProductId}`,
            updatedItem
          )
          .then((res) => {
            console.log(res.data);
            toast.success(
              `Product id ${editingProductId} has been updated successfully!`
            );
            setEditingProductId(null);
            dispatch(fetchProducts());
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleCreateNewProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const product = {
      title: formData.get("title") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      categoryId: Number(formData.get("category")),
      images: images,
    };

    const response = await axios
      .post("https://api.escuelajs.co/api/v1/products/", product)
      .then((res) => {
        console.log("Successfully added product:", res.data);

        // Close the modal and reset any states if necessary
        toast.success(`A new product has been created successfully!`);
        setCreateProductModalOpen(false);
        setImages([]);
        setCurrentImageLink("");
        dispatch(fetchProducts());
      })
      .catch((err) => console.log(err));
    return response;
  };

  const handleDeleteProduct = async (id: number) => {
    const response = await axios
      .delete(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        console.log("Successfully deleted product:", res.data);

        // Close the modal and reset any states if necessary
        setDeleteProductModalOpen(false);
        toast.success(`Product id ${id} has been deleted successfully!`);
        dispatch(fetchProducts());
      })
      .catch((err) => console.log(err));
    return response;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
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
      width: 100,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 500,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            sx={{ marginRight: "5px" }}
            onClick={() => handleEditProduct(params.row)}
          >
            {editingProductId === params.row.id ? "Save" : "Edit"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDeleteProduct(params.row);
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
    <Box sx={{ width: "100%" }}>
      <Stack alignItems={"center"}>
        <Typography variant="h3">Admin panel</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => setCreateProductModalOpen(true)}
        >
          Create new product
        </Button>
        <DataGrid
          rows={products}
          columns={columns}
          isCellEditable={(params) => {
            return editingProductId === params.id;
          }}
        />
      </Stack>
      <Modal
        open={createProductModalOpen}
        onClose={() => setCreateProductModalOpen(false)}
        aria-labelledby="add-product-title"
        aria-describedby="add-product-description"
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
          <Typography id="add-product-title" variant="h6" component="h2">
            Add Product
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleCreateNewProduct}
          >
            <TextField
              name="title"
              margin="normal"
              required
              fullWidth
              label="Title"
            />
            <TextField
              name="price"
              margin="normal"
              required
              fullWidth
              label="Price"
              type="number"
            />
            <TextField
              name="description"
              margin="normal"
              required
              fullWidth
              label="Description"
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                label="Category"
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              label="Image Link"
              value={currentImageLink}
              onChange={(event) => setCurrentImageLink(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setImages((prevImages) => [...prevImages, currentImageLink]);
                setCurrentImageLink(""); // Clear the input after adding
              }}
            >
              Add
            </Button>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Added Images:</Typography>
              <List>
                {images.map((image, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={image} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Add Product
            </Button>
          </Box>
        </Box>
      </Modal>
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
          {deleteProduct ? (
            <>
              <Typography>Are you sure to delete this product?</Typography>
              <Typography>Product ID: {deleteProduct.id}</Typography>
              <Typography>Title: {deleteProduct.title}</Typography>
              <Typography>Price: {deleteProduct.price}</Typography>
              <Typography>Category: {deleteProduct.category.name}</Typography>
              <Typography>Description: {deleteProduct.description}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteProduct(deleteProduct.id)}
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
            </>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
