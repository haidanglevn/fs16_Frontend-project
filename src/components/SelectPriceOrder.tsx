import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

interface SelectPriceOrderProps {
  setPriceOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function SelectPriceOrder({
  setPriceOrder,
}: SelectPriceOrderProps) {
  const handleSortChange = (event: any) => {
    setPriceOrder(event.target.value);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={"row"}
      gap={"20px"}
      alignItems={"center"}
      justifyContent={isSmallScreen ? "space-between" : ""}
      sx={{ width: isSmallScreen ? "100%" : "auto" }}
    >
      <Typography variant="h6">Price Order</Typography>
      <select
        id="sortByPrice"
        onChange={handleSortChange}
        style={{ width: "150px", height: isSmallScreen ? "50px" : "100%" }}
      >
        <option value="desc" defaultChecked>
          Descending
        </option>
        <option value="asc">Ascending</option>
      </select>
    </Stack>
  );
}
