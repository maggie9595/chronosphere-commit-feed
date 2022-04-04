import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import "./App.css";

function DoesNotExist() {
  return (
    <Box
      sx={{
        mx: "auto",
        width: "100%",
        p: 1,
        mt: 12,
        textAlign: "center",
      }}
    >
      <h3>Sorry, the page you requested could not be found.</h3>
      <Link
        color="inherit"
        href="/"
        sx={{
          p: 1,
        }}
      >
        <Typography variant="subtitle2">Return to homepage</Typography>
      </Link>
    </Box>
  );
}

export default DoesNotExist;
