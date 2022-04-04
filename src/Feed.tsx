import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import Paper from "@mui/material/Paper";
import "./App.css";

type Commit = {
  commit: {
    author: { date: Date; email: string; name: string };
    message: string;
    url: string;
  };
};

function Feed() {
  const { user, repo } = useParams();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [commits, setCommits] = useState<[] | undefined>(undefined);

  useEffect(() => {
    const headers = {
      Authorization: "token TOKEN",
    };
    fetch(`https://api.github.com/repos/${user}/${repo}/commits`, {
      headers,
    })
      .then(async (response) => {
        const data = await response.json();
        console.warn(data);
        setCommits(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Failed to fetch from GitHub API: ", error);
      });
  }, []);

  return loading ? (
    <>Loading</>
  ) : (
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
              Showing Commits for /{user}/{repo}
            </Typography>

            <TableContainer>
              <Table aria-label="Commit Feed Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Author</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commits.map(({ commit }: Commit) => (
                    <TableRow key={commit.url}>
                      <TableCell>
                        {format(new Date(commit.author.date), "Pp")}
                      </TableCell>
                      <TableCell>
                        <Link href={commit.url} rel="noopener" target="_blank">
                          {commit.message}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {commit.author.name}({commit.author.email})
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {error && (
              <Grid container spacing={2}>
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
              </Grid>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Feed;