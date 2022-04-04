import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Theres nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
