import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";

import Container from "components/Core/Container";
import PlaceBid from "components/Bid/PlaceBid";
import Bid from "components/Bid/Bid";
import { AlertType } from "typings/common";
import { job as getJobDetail } from "api/api";

const JobDetails = () => {
  const { id: jobId } = useParams();

  const [pageLoading, setPageLoading] = React.useState(false);
  const [bid, setBid] = React.useState<any>();
  const [job, setJob] = React.useState<any>();
  const [alert, setAlert] = React.useState<AlertType>();

  const [openBidForm, setOpenBidForm] = React.useState(false);

  React.useEffect(() => {
    if (jobId) {
      setPageLoading(true);
      getJobDetail(jobId)
        .then((data: any) => {
          setJob(data.job);
          setBid(data.bid);
        })
        .catch((err) => {
          console.log(err);
          setAlert({
            show: true,
            type: "error",
            text: "Something went wrong!",
          });
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [jobId]);

  return (
    <Container isPageLoading={pageLoading} alert={alert}>
      <Card>
        <CardHeader title={job?.title} />
        <CardContent>
          <Typography>{job?.description}</Typography>

          <Box my={2} display={"flex"}>
            <Typography variant="h6" mr={1}>
              Budget:
            </Typography>
            <Typography>
              $
              {job?.expected_project_rate
                ? job?.expected_project_rate
                : job?.expected_hourly_rate || 0 + " per hour"}
            </Typography>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Required Skills:</Typography>
            <Stack direction="row" spacing={1} my={1}>
              {job?.required_skills.map((skill: any, index: any) => (
                <Chip key={index} label={skill} variant="outlined" />
              ))}
            </Stack>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Optional Skills:</Typography>
            <Stack direction="row" spacing={1} my={1}>
              {job?.optional_skills.map((skill: any, index: any) => (
                <Chip key={index} label={skill} variant="outlined" />
              ))}
            </Stack>
          </Box>

          <Box my={2} display={"flex"}>
            <Typography variant="h6" mr={1}>
              Expertise Level:
            </Typography>
            <Typography textTransform={"capitalize"}>
              {job?.required_expertise_level?.toLowerCase()}
            </Typography>
          </Box>

          <Box my={2} display={"flex"} color={"red"}>
            <Typography variant="h6" mr={1}>
              Accepting Bid Till:
            </Typography>
            <Typography>
              {job?.proposal_deadline &&
                moment(job?.proposal_deadline).format("MM-DD-YYYY")}
            </Typography>
          </Box>

          <Button
            size="large"
            variant="contained"
            sx={{ my: 2 }}
            type="submit"
            onClick={() => setOpenBidForm(true)}
          >
            {!bid ? "Place a Bid" : "View Bid"}
          </Button>
        </CardContent>
      </Card>

      <Drawer anchor={"right"} open={openBidForm} onClose={() => setOpenBidForm(false)}>
        <Box width={800} my={12}>
          {!bid ? (
            <PlaceBid jobId={job?.id} />
          ) : (
            <Bid bid={bid} isWinner={bid?.talent_id === job?.bid_winners?.[0]} />
          )}
        </Box>
      </Drawer>
    </Container>
  );
};

export default JobDetails;
