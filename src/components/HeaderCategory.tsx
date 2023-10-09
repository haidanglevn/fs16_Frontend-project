import { useSelector } from "react-redux";
import { selectCategories } from "../redux/slices/productSlice";
import { Category } from "../types/productSlice";

// This is the same functionality of SelectCategory.tsx, but different styling to fit it the header.

interface SelectCategoryProps {
  setChosenCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectCategory({
  setChosenCategory,
}: SelectCategoryProps) {
  const categories = useSelector(selectCategories);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setChosenCategory(event.target.value);
  };

  return (
    <>
      <label htmlFor="sortByCategory">Choose a category:</label>
      <select id="sortByCategory" onChange={handleChange}>
        <option value="" defaultChecked>
          All
        </option>
        {categories.map((category: Category) => {
          return (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
