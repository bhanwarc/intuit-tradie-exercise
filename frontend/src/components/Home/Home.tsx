import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Container from "components/Core/Container";
import pages from "enums/pages";

import { useCurrentState } from "context/global";

const Home = () => {
  const { globalState } = useCurrentState();
  const isLoggedin = globalState?.isLoggedin || false;
  const isClient = globalState?.isClient || false;
  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        {/* client */}
        <Grid item xs={6}>
          <Button
            style={{ width: 200, height: 70 }}
            size="large"
            variant="contained"
            component={RouterLink}
            to={isLoggedin && !isClient ? pages.JOBS : pages.TALENT_AUTH}
          >
            Tradie
          </Button>
        </Grid>
        {/* talent */}
        <Grid item xs={6}>
          <Button
            style={{ width: 200, height: 70 }}
            size="large"
            variant="contained"
            component={RouterLink}
            to={isLoggedin && isClient ? pages.CLIENT_JOBS : pages.CLIENT_AUTH}
          >
            Customer
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
