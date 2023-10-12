// Footer.js
import React from "react";
import { Container, Typography, Box, Stack } from "@mui/material";

function Footer() {
  return (
    <Stack
      component="footer"
      justifyContent="center"
      sx={{
        backgroundColor: "var(--primary-color)",
        height: "var(--footer-height)",
        padding: "auto 0",
        width: "100%",
      }}
    >
      <Typography variant="body1" align="center" color={"text.primary"}>
        © Created by Dang Le 2023
      </Typography>
    </Stack>
  );
}

export default Footer;
