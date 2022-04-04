import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";
import "./App.css";

function DoesNotExist() {
  return (
    <Box
      sx={{
        mx: "auto",
        width: "100%",
        mt: 15,
        textAlign: "center",
      }}
    >
      <img src="/404.jpg" width="500px" />
      <h3>
        Sorry, the page you requested could not be found or the repository you
        entered does not exist.
        <br />
        Please try again.
      </h3>
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
