import { Stack, Typography } from "@mui/material";
import { useScreenSizes } from "../hooks/useScreenSizes";

interface SelectItemsPerPageProps {
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectItemsPerPage({
  setItemsPerPage,
}: SelectItemsPerPageProps) {
  const handleSortChange = (event: any) => {
    setItemsPerPage(event.target.value);
  };
  const { isSmallScreen } = useScreenSizes();

  return (
    <Stack
      direction={"row"}
      gap={"10px"}
      alignItems={"center"}
      justifyContent={isSmallScreen ? "space-between" : ""}
      sx={{ width: isSmallScreen ? "100%" : "auto" }}
    >
      <Typography variant="h6" color={"text.primary"}>
        Items Per Page
      </Typography>
      <select
        id="sortByPrice"
        onChange={handleSortChange}
        style={{
          width: "50px",
          height: isSmallScreen ? "50px" : "100%",
          color: "text.primary",
        }}
      >
        <option value={20} defaultChecked>
          20
        </option>
        <option value={50}>50</option>
      </select>
    </Stack>
  );
}
