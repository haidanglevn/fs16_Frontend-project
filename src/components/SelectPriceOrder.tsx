interface SelectPriceOrderProps {
  setPriceOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function SelectPriceOrder({
  setPriceOrder,
}: SelectPriceOrderProps) {
  const handleSortChange = (event: any) => {
    setPriceOrder(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sortByPrice">Sort by price order: </label>
      <select id="sortByPrice" onChange={handleSortChange}>
        <option value="asc" defaultChecked>
          Ascending
        </option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
