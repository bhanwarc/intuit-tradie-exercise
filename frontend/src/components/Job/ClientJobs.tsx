import * as React from "react";
import { Box, Button } from "@mui/material";
import { v4 as uuid } from "uuid";
import { Link as RouterLink } from "react-router-dom";

import Container from "components/Core/Container";
import Job from "./Job";
import pages from "enums/pages";
import { clientJobs } from "api/api";
import { useCurrentUser } from "context/user";

const Jobs = () => {
  const [pageLoading, setPageLoading] = React.useState(false);
  const [jobs, setJobs] = React.useState<any>();

  const { user } = useCurrentUser();
  const userId = user?.id;

  React.useEffect(() => {
    if (userId) {
      setPageLoading(true);
      clientJobs(userId)
        .then((data: any) => {
          setJobs(data.jobs);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [userId]);
  return (
    <Container isPageLoading={pageLoading}>
      <Box mb={2}>
        <Button
          size="large"
          variant="contained"
          component={RouterLink}
          to={`${pages.CLIENT_JOB.replace(":id", uuid())}?n=true`}
        >
          Create New Project
        </Button>
      </Box>
      {jobs && jobs.map((job: any, index: any) => <Job key={index} jobDetails={job} />)}
    </Container>
  );
};

export default Jobs;
