import { Button, IconButton, Stack, Typography } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { PaymentMethod } from "../pages/CreateOrderPage";

interface PaymentCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  method,
  isSelected,
  onSelect,
}) => {
  return (
    <Stack
      alignItems={"center"}
      sx={{
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "20px",
        backgroundColor: isSelected ? "green" : "",
      }}
    >
      <>{method.icon}</>
      <Typography color={isSelected ? "white" : "text.primary"}>
        {method.name}
      </Typography>

      <IconButton onClick={() => onSelect(method)}>
        {isSelected ? (
          <RadioButtonCheckedIcon color="warning" />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </IconButton>
    </Stack>
  );
};

export default PaymentCard;
