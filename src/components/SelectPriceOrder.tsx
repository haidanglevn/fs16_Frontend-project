import { Stack, Typography } from "@mui/material";
import { useScreenSizes } from "../hooks/useScreenSizes";

interface SelectPriceOrderProps {
  setPriceOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function SelectPriceOrder({
  setPriceOrder,
}: SelectPriceOrderProps) {
  const { isSmallScreen } = useScreenSizes();
  const handleSortChange = (event: any) => {
    setPriceOrder(event.target.value);
  };

  return (
    <Stack
      direction={"row"}
      gap={"10px"}
      alignItems={"center"}
      justifyContent={isSmallScreen ? "space-between" : ""}
      sx={{ width: isSmallScreen ? "100%" : "auto" }}
    >
      <Typography variant="h6" color={"text.primary"}>
        Price Order
      </Typography>
      <select
        id="sortByPrice"
        onChange={handleSortChange}
        style={{ width: "100px", height: isSmallScreen ? "50px" : "100%" }}
      >
        <option value="desc" defaultChecked>
          Descending
        </option>
        <option value="asc">Ascending</option>
      </select>
    </Stack>
  );
}
