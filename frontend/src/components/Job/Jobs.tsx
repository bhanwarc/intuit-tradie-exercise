import * as React from "react";

import Container from "components/Core/Container";
import Job from "./Job";
import { jobs as publicJobs } from "api/api";

const Jobs = () => {
  const [pageLoading, setPageLoading] = React.useState(false);
  const [jobs, setJobs] = React.useState<any>();

  React.useEffect(() => {
    setPageLoading(true);
    publicJobs()
      .then((data: any) => {
        setJobs(data.jobs);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  return (
    <Container isPageLoading={pageLoading}>
      {jobs && jobs.map((job: any, index: any) => <Job key={index} jobDetails={job} />)}
    </Container>
  );
};

export default Jobs;
