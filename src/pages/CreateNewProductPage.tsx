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
  ImageList,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Color, Product, Size } from "../types/generalTypes";
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
import { useScreenSizes } from "../hooks/useScreenSizes";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

type ImageCreateDTO = {
  url: string;
};

type VariantCreateDTO = {
  color: string | number;
  size: string | number;
  quantity: number;
};

export type CreateNewProductPayload = {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  variants: VariantCreateDTO[];
  images: ImageCreateDTO[];
};

const enumToArray = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({ label: key, value: enumObj[key] }));
};

const colorOptions = enumToArray(Color);
const sizeOptions = enumToArray(Size);

const CreateNewProductPage = () => {
  const products = useSelector(selectProducts);
  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentImageLink, setCurrentImageLink] = useState<string>(
    "https://picsum.photos/1000/1000?random=100"
  );
  const [selectedColor, setSelectedColor] = useState<string | number>(0);
  const [selectedSize, setSelectedSize] = useState<string | number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const [images, setImages] = useState<ImageCreateDTO[]>([]);
  const [variants, setVariants] = useState<VariantCreateDTO[]>([]);

  const navigate = useNavigate();

  console.log("selectedColor", selectedColor);
  console.log("selectedSize", selectedSize);

  const handleCreateNewProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productPayload: CreateNewProductPayload = {
      title: formData.get("title") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      categoryId: selectedCategory,
      images: images,
      variants: variants,
    };

    if (images.length > 0 && variants.length > 0) {
      dispatch(createNewProduct(productPayload));
      dispatch(fetchProducts());
      navigate("/");
    } else {
      toast.error("Please add at least one image and one variant!");
    }
  };

  const handleRemoveImage = (image: ImageCreateDTO) => {
    let array = [...images];
    let index = array.findIndex((item) => item === image);
    if (index !== -1) {
      array.splice(index, 1);
    }
    setImages(array);
  };

  return (
    <>
      <Stack p={"50px"} sx={{ minHeight: "90vh" }}>
        <Typography id="add-product-title" variant="h4">
          Create New Product
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "30px" }}>
          Basic information
        </Typography>
        <Box component="form" onSubmit={handleCreateNewProduct}>
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

          <Typography variant="h5" sx={{ marginTop: "30px" }}>
            Images
          </Typography>
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
              if (images.length < 6) {
                setImages([...images, { url: currentImageLink }]);
                setCurrentImageLink(
                  "https://picsum.photos/1000/1000?random=100"
                );
              } else {
                toast.error("Maximum image amount reached!");
              }
            }}
          >
            Add Image Link
          </Button>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ marginTop: 2 }}
          >
            <Stack>
              <Typography variant="h6">
                Added Images ({images.length}/6):
              </Typography>
              <List>
                {images.map((image, index) => (
                  <ListItem key={index}>
                    <Typography>
                      Image_{index + 1}: "{image.url}"
                    </Typography>
                    <IconButton
                      color="error"
                      sx={{
                        borderRadius: "50%",
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        handleRemoveImage(image);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Stack>
            <Stack
              direction={isMediumScreen ? "column" : "row"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              flexWrap={"wrap"}
              gap={"10px"}
              sx={{
                maxHeight: "300px",
                maxWidth: "400px",
              }}
            >
              {images.map((img) => {
                return <img src={img.url} style={{ width: 100 }} />;
              })}
            </Stack>
          </Stack>

          <Typography variant="h5" sx={{ marginTop: "30px" }}>
            Variants
          </Typography>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="color">Colors</InputLabel>
            <Select
              label="Color"
              name="color"
              id="color"
              value={selectedColor}
              onChange={(event) => setSelectedColor(event.target.value)}
            >
              {colorOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="size">sizes</InputLabel>
            <Select
              label="size"
              name="size"
              id="size"
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
            >
              {sizeOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack>
            <label htmlFor="quantity" style={{ fontSize: "24px" }}>
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="300"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              style={{ fontSize: "24px", width: "10 0px" }}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setVariants([
                ...variants,
                {
                  color: selectedColor,
                  size: selectedSize,
                  quantity: quantity,
                },
              ]);
            }}
          >
            Add Variant
          </Button>
          <Stack
            direction={isMediumScreen ? "column" : "row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            flexWrap={"wrap"}
            gap={"10px"}
            sx={{}}
          >
            {variants.map((variant) => {
              return (
                <Typography>
                  Size: {variant.size} | Color: {variant.color} | Quantity:
                  {variant.quantity}
                </Typography>
              );
            })}
          </Stack>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Add Product
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default CreateNewProductPage;
