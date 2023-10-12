// Footer.js
import React from "react";
import { Container, Typography, Box } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--primary-color)",
        height: "var(--footer-height)",
        padding: "auto 0",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center" color="textSecondary">
          © Dang Le 2023
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
