import { useSelector } from "react-redux";
import { selectCategories } from "../redux/slices/productSlice";
import { Category } from "../types/productSlice";
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface SelectCategoryProps {
  setChosenCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectCategory({
  setChosenCategory,
}: SelectCategoryProps) {
  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setChosenCategory(category);
  };

  const theme = useTheme();

  return (
    <Box sx={{ marginTop: "20px", borderBottom: "1px solid #E69F56" }}>
      <Typography variant="h6" color={"text.primary"}>
        Category
      </Typography>
      <FormControlLabel
        value=""
        control={
          <Radio
            checked={selectedCategory === ""}
            onChange={handleChange}
            value=""
            name="category"
            color="primary"
          />
        }
        label={<Typography color="text.primary">All</Typography>}
      />
      {categories.map((category: Category) => {
        return (
          <FormControlLabel
            key={category.id}
            value={category.name}
            control={
              <Radio
                checked={selectedCategory === category.name}
                onChange={handleChange}
                value={category.name}
                name="category"
                color="primary"
              />
            }
            label={
              <Typography color="text.primary">{category.name}</Typography>
            }
          />
        );
      })}
    </Box>
  );
}
