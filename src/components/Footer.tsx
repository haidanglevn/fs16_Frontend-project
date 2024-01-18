import { Typography, Stack, useTheme, TextField, Button } from "@mui/material";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { ThemeChangeProps } from "./Layout";

const Footer: React.FC<ThemeChangeProps> = ({ mode, changeTheme }) => {
  const theme = useTheme();
  const { isMediumScreen, isLargeScreen, isSmallScreen } = useScreenSizes();

  return (
    <Stack
      component="footer"
      justifyContent="center"
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        padding: isLargeScreen ? "0px 40px" : "0px 100px",
      }}
    >
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        gap={isSmallScreen ? "30px" : 0}
        justifyContent={"space-between"}
        sx={{ padding: "20px 0", borderBottom: "1px solid white" }}
      >
        <Stack gap={"5px"}>
          <Typography variant="h5" color="white">
            Subscribe to our <span style={{ color: "orange" }}>newsletter</span>
          </Typography>
          <Typography variant="body1" color="white">
            Stay updated with our latest{" "}
            <span style={{ color: "orange" }}>news</span> and
            <span style={{ color: "orange" }}> offers</span>
          </Typography>
        </Stack>
        <Stack gap={"5px"}>
          <Stack direction={"row"} gap={"20px"}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              color="primary"
              sx={{
                backgroundColor:
                  mode == "dark" ? theme.palette.primary.light : "white",
              }}
            />
            <Button variant="contained" color="success">
              Join
            </Button>
          </Stack>
          <Typography variant="body2" color="white">
            By subscribing, you agree to our Privacy Policy
          </Typography>
        </Stack>
      </Stack>

      {!isSmallScreen ? (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ padding: "20px 0", borderBottom: "1px solid white" }}
        >
          <Stack>
            <Typography
              color="white"
              variant="h6"
              paddingBottom={"5px"}
              fontWeight={"bold"}
            >
              About us
            </Typography>
            <Typography color="white" variant="body2">
              Contact
            </Typography>
            <Typography color="white" variant="body2">
              FAQ
            </Typography>
            <Typography color="white" variant="body2">
              Privacy
            </Typography>
            <Typography color="white" variant="body2">
              Shipping
            </Typography>
          </Stack>
          <Stack>
            <Typography
              color="white"
              variant="h6"
              paddingBottom={"5px"}
              fontWeight={"bold"}
            >
              Returns
            </Typography>
            <Typography color="white" variant="body2">
              Track Order
            </Typography>
            <Typography color="white" variant="body2">
              Customer Support
            </Typography>
            <Typography color="white" variant="body2">
              Blog
            </Typography>
            <Typography color="white" variant="body2">
              Affiliate
            </Typography>
          </Stack>
          <Stack>
            <Typography
              color="white"
              variant="h6"
              paddingBottom={"5px"}
              fontWeight={"bold"}
            >
              Sitemap
            </Typography>
            <Typography color="white" variant="body2">
              Help Center
            </Typography>
            <Typography color="white" variant="body2">
              Order Status
            </Typography>
            <Typography color="white" variant="body2">
              Payment Methods
            </Typography>
            <Typography color="white" variant="body2">
              Returns & Exchange
            </Typography>
          </Stack>
          <Stack>
            <Typography
              color="white"
              variant="h6"
              paddingBottom={"5px"}
              fontWeight={"bold"}
            >
              Terms & Conditions
            </Typography>
            <Typography color="white" variant="body2">
              About Our Company
            </Typography>
            <Typography color="white" variant="body2">
              Our Mission & Vision
            </Typography>
            <Typography color="white" variant="body2">
              Team Members
            </Typography>
            <Typography color="white" variant="body2">
              Community Involvement
            </Typography>
          </Stack>
          <Stack>
            <Typography
              color="white"
              variant="h6"
              paddingBottom={"5px"}
              fontWeight={"bold"}
            >
              Follow us
            </Typography>
            <Typography color="white" variant="body2">
              Facebook
            </Typography>
            <Typography color="white" variant="body2">
              Instagram
            </Typography>
            <Typography color="white" variant="body2">
              X
            </Typography>
            <Typography color="white" variant="body2">
              LinkedIn
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}

      <Stack
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
        sx={{ padding: "20px 0" }}
      >
        <Typography
          color="white"
          variant="h5"
          paddingBottom={"5px"}
          fontWeight={"bold"}
        >
          <span style={{ color: "orange" }}>Ecom</span>Echo.com
        </Typography>
        <Typography variant="body1" color="white">
          © Created by Dang Le 2023
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
