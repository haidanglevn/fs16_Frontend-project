import { useSelector } from "react-redux";
import { selectCategories } from "../redux/slices/productSlice";

interface SelectCategoryProps {
  setChosenCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectCategory({
  setChosenCategory,
}: SelectCategoryProps) {
  const categories = useSelector(selectCategories);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenCategory(event.target.value);
  };

  return (
    <>
      <label htmlFor="sortByCategory">Choose a category:</label>
      <select id="sortByCategory" onChange={handleChange}>
        <option value="" defaultChecked>
          All
        </option>
        {categories.map((category) => {
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
