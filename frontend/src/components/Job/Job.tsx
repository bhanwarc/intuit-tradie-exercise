import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";

import pages from "enums/pages";
import { useCurrentUser } from "context/user";
import { useCurrentState } from "context/global";
import { closeJob } from "api/api";
import { LoadingButton } from "@mui/lab";

const Job = ({ jobDetails }: { jobDetails: any }) => {
  const navigate = useNavigate();
  const { globalState } = useCurrentState();
  const isClient = globalState?.isClient || false;

  const { user } = useCurrentUser();
  const userId = user?.id;

  const [buttonLoading, setButtonLoading] = React.useState(false);

  const closeAndAnnouceWinner = (jobId: string) => {
    if (userId) {
      setButtonLoading(true);
      closeJob(userId, jobId)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setButtonLoading(false);
        });
    }
  };

  const navigateToJob = (jobId: string) => {
    if (isClient) {
      navigate(pages.CLIENT_JOB.replace(":id", jobId));
    } else {
      navigate(pages.JOB.replace(":id", jobId));
    }
  };

  return (
    <Box mb={2}>
      <Card>
        {!isClient && jobDetails?.bid_already_placed == "1" ? (
          <Chip label={"Bid Already Placed"} variant="filled" color="info" />
        ) : moment(jobDetails?.proposal_deadline) < moment() ? (
          <Chip label={"Closed"} variant="filled" color="error" />
        ) : (
          <></>
        )}
        <CardHeader title={jobDetails?.title} />
        <CardContent>
          <Typography>{jobDetails?.description}</Typography>
          <Stack direction="row" spacing={1} my={2}>
            {jobDetails.required_skills.map((skill: any, index: any) => (
              <Chip key={index} label={skill} variant="outlined" />
            ))}
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box mt={2} display={"flex"} color={"red"}>
              <Typography variant="h6" mr={1}>
                Accepting Bid Till:
              </Typography>
              <Typography>
                {jobDetails?.proposal_deadline &&
                  moment(jobDetails?.proposal_deadline).format("MM-DD-YYYY HH:mm")}
              </Typography>
            </Box>

            <Stack direction={"row"} spacing={2}>
              <Button
                size="small"
                variant="contained"
                onClick={() => navigateToJob(jobDetails.id)}
              >
                View Job
              </Button>
              {isClient && (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    component={RouterLink}
                    to={pages.JOB_BIDS.replace(":id", jobDetails.id)}
                  >
                    View Bids
                  </Button>
                  {moment(jobDetails?.proposal_deadline) > moment() && (
                    <LoadingButton
                      size="large"
                      variant="contained"
                      loading={buttonLoading}
                      onClick={() => closeAndAnnouceWinner(jobDetails.id)}
                    >
                      Close and Announce winner
                    </LoadingButton>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Job;
