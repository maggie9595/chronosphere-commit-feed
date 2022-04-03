import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [repo, setRepo] = useState<string | undefined>(undefined);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="div" gutterBottom>
          GitHub Commit Feed
        </Typography>

        <Paper elevation={3}>
          <Box
            sx={{
              p: 3,
              mt: 4,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ mb: 3 }}
            >
              User Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="GitHub Username/Org"
                  id="user"
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
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
                  onClick={(e) => {
                    // client
                    //   .PutUser({
                    //     user_id: uuid,
                    //     name: newName ? newName : name,
                    //     primary_email: newEmail ? newEmail : email,
                    //   })
                    //   .then(
                    //     (resp) => {
                    //       // window.location.reload();
                    //       console.warn(resp);
                    //       setEditing(false);
                    //     },
                    //     (err) => {
                    //       console.log("Failed to update user info: ", err);
                    //     }
                    //   );
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
