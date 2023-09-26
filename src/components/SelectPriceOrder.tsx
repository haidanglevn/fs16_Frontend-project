import { useEffect, useState } from "react";
import { productSlice } from "../redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export default function SelectPriceOrder() {
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSortChange = (event: any) => {
    if (event.target.value === "") {
      setPriceOrder(null);
    } else {
      setPriceOrder(event.target.value);
    }
  };

  useEffect(() => {
    dispatch(productSlice.actions.sortByPrice(priceOrder));
  }, [priceOrder, dispatch]);

  return (
    <div>
      <label htmlFor="sortByPrice">Sort by price order: </label>
      <select id="sortByPrice" onChange={handleSortChange}>
        <option value="" defaultChecked>
          Default
        </option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
