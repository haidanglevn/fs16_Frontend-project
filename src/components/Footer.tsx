// Footer.js
import React from "react";
import { Typography, Stack, useTheme } from "@mui/material";

function Footer() {
  const theme = useTheme();
  return (
    <Stack
      component="footer"
      justifyContent="center"
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: "var(--footer-height)",
        padding: "auto 0",
        width: "100%",
      }}
    >
      <Typography variant="body1" align="center" color="white">
        © Created by Dang Le 2023
      </Typography>
    </Stack>
  );
}

export default Footer;
