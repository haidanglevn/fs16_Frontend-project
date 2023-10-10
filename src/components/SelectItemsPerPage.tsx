import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

interface SelectItemsPerPageProps {
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectItemsPerPage({
  setItemsPerPage,
}: SelectItemsPerPageProps) {
  const handleSortChange = (event: any) => {
    setItemsPerPage(event.target.value);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
      <Typography variant="h6">Items Per Page</Typography>
      <select
        id="sortByPrice"
        onChange={handleSortChange}
        style={{ width: "150px", height: isSmallScreen ? "50px" : "100%" }}
      >
        <option value={20} defaultChecked>
          20
        </option>
        <option value={50}>50</option>
      </select>
    </Stack>
  );
}
