import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

type Commit = {
  commit: {
    author: { date: Date; email: string; name: string };
    message: string;
  };
  html_url: string;
};

function Feed() {
  // GitHub personal access token to be used for API calls
  const headers = {
    Authorization: "token TOKEN",
  };

  const { user, repo } = useParams();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [commits, setCommits] = useState<[] | undefined>(undefined);
  const [nextPage, setNextPage] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${user}/${repo}/commits`, {
      headers,
    })
      .then(async (response) => {
        const data = await response.json();

        // Navigate to does not exist page when no commits can be found
        if (data.message === "Not Found") {
          window.location.href = "/does/not/exist";
        }

        // Parse the link for the next page from the response header
        const linkHeader = response.headers.get("link");
        if (linkHeader) {
          setNextPage(linkHeader.match(/<?([^>]*)>(.*)/)[1]);
        }

        setCommits(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error encountered: ", error);
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
                  {commits.map(({ commit, html_url }: Commit) => (
                    <TableRow key={html_url}>
                      <TableCell>
                        {format(new Date(commit.author.date), "Pp")}
                      </TableCell>
                      <TableCell>
                        <Link href={html_url} rel="noopener" target="_blank">
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

            {nextPage && (
              <Button
                color="primary"
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
                onClick={() => {
                  fetch(nextPage, {
                    headers,
                  })
                    .then(async (response) => {
                      const data = await response.json();

                      // Parse the link for the next page from the response header again
                      const linkHeader = response.headers.get("link");
                      if (linkHeader) {
                        setNextPage(linkHeader.match(/<?([^>]*)>(.*)/)[1]);
                      }

                      // Append the new commits to the end of the current commits on the page
                      setCommits(commits.concat(data) as []);
                    })
                    .catch((error) => {
                      setError(error.message);
                      console.error("Error encountered: ", error);
                    });
                }}
              >
                Load More Commits
              </Button>
            )}

            {error && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    component="div"
                    className="error"
                    gutterBottom
                  >
                    Error encountered: {error}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>

        <Link
          color="inherit"
          href="/"
          sx={{
            p: 1,
          }}
        >
          <Typography variant="subtitle2">Return to homepage</Typography>
        </Link>
      </Grid>
    </Grid>
  );
}

export default Feed;
