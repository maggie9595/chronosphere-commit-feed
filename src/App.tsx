import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DoesNotExist from "./DoesNotExist";
import Feed from "./Feed";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GitHub Commit Feed
          </Typography>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path=":user/:repo" element={<Feed />}></Route>
        <Route path="/does/not/exist" element={<DoesNotExist />}></Route>
        <Route path="*" element={<Navigate to="/does/not/exist" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
