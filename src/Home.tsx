import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import "./App.css";

function Home() {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [repo, setRepo] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <Grid container spacing={2} sx={{ px: 5 }}>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Box
            sx={{
              p: 3,
              mt: 13,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Search
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GitHub Username/Org"
                  id="user"
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Repo Name"
                  id="repo"
                  onChange={(e) => {
                    setRepo(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    window.location.href = `/${user}/${repo}`;
                  }}
                >
                  Submit
                </Button>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    component="div"
                    className="error"
                    gutterBottom
                  >
                    Failed to fetch from GitHub API: {error}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;
