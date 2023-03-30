import * as React from "react";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useParams } from "react-router-dom";

import Container from "components/Core/Container";
import { getJobBids } from "api/api";
import { useCurrentUser } from "context/user";

const Bids = () => {
  const { id: jobId } = useParams();
  const [pageLoading, setPageLoading] = React.useState(false);
  const [bids, setBids] = React.useState<any>();
  const [job, setJob] = React.useState<any>();

  const { user } = useCurrentUser();
  const userId = user?.id;

  React.useEffect(() => {
    if (userId && jobId) {
      setPageLoading(true);
      getJobBids(userId, jobId)
        .then((data: any) => {
          setBids(data.bids);
          setJob(data.job);
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [userId, jobId]);

  const winnerId = job?.bid_winners?.length ? job?.bid_winners[0] : "";

  return (
    <Container isPageLoading={pageLoading}>
      {bids &&
        bids.map((bid: any, index: any) => (
          <Box key={index} mb={2}>
            <Card>
              {winnerId === bid?.Talent?.id ? (
                <Chip label={"Winner"} variant="filled" color="warning" />
              ) : (
                <></>
              )}

              <CardContent>
                <Box mt={1} display={"flex"}>
                  <Typography mr={1}>Name:</Typography>
                  <Typography>
                    {bid?.Talent?.first_name} {bid?.Talent?.last_name}
                  </Typography>
                </Box>

                <Box mt={1} display={"flex"}>
                  <Typography mr={1}>Proposal:</Typography>
                  <Typography textOverflow={"ellipsis"}>{bid?.proposal}</Typography>
                </Box>

                <Box my={2} display={"flex"}>
                  <Typography mr={1}>Skills:</Typography>
                  <Stack direction="row" spacing={1}>
                    {bid?.Talent?.skills?.map((skill: any, index: any) => (
                      <Chip key={index} label={skill} variant="outlined" />
                    ))}
                  </Stack>
                </Box>

                <Box mt={1} display={"flex"}>
                  <Typography mr={1}>Bid at:</Typography>
                  <Typography>
                    Fixed Price - ${bid?.fix_rate}, Hourly Rate - ${bid.hourly_rate}
                  </Typography>
                </Box>

                <Box mt={1} display={"flex"}>
                  <Typography mr={1}>Hours Required:</Typography>
                  <Typography>{bid.job_timeline} hours</Typography>
                </Box>

                <Box mt={1} mb={2} display={"flex"}>
                  <Typography mr={1}>Bid submited on:</Typography>
                  <Typography>
                    {bid?.created_at &&
                      moment(bid?.created_at).format("MM-DD-YYYY HH:mm")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
    </Container>
  );
};

export default Bids;
