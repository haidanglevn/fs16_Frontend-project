import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Category } from "../types/categorySlice";
import { selectCategories } from "../redux/slices/categorySlice";

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
    <Box
      sx={{
        marginTop: "20px",
        borderBottom: `1px solid ${theme.palette.text.primary}`,
      }}
    >
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
            color="warning"
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
                color="warning"
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
