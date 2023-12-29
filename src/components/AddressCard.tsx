import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Address } from "../types/generalTypes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: (address: Address) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onSelect,
}) => {
  return (
    <Stack
      sx={{
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "20px",
        backgroundColor: isSelected ? "green" : "",
      }}
    >
      <Typography color={isSelected ? "white" : "text.primary"}>
        {address.street}
      </Typography>
      <Typography color={isSelected ? "white" : "text.primary"}>
        {address.state}
      </Typography>
      <Typography color={isSelected ? "white" : "text.primary"}>
        {address.postalCode} {address.city}
      </Typography>
      <Typography color={isSelected ? "white" : "text.primary"}>
        {address.country}
      </Typography>
      <IconButton onClick={() => onSelect(address)}>
        {isSelected ? (
          <RadioButtonCheckedIcon color="warning" />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </IconButton>
    </Stack>
  );
};

export default AddressCard;
