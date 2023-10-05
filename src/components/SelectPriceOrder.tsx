import { Stack, Typography } from "@mui/material";

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
    <Stack direction={"row"} gap={"20px"}>
      <Typography variant="h6">Price Order</Typography>
      <select
        id="sortByPrice"
        onChange={handleSortChange}
        style={{ width: "100px" }}
      >
        <option value="asc" defaultChecked>
          Ascending
        </option>
        <option value="desc">Descending</option>
      </select>
    </Stack>
  );
}
