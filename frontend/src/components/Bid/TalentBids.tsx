import * as React from "react";
import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import Container from "components/Core/Container";
import { talentBids } from "api/api";
import pages from "enums/pages";

const Bids = () => {
  const [pageLoading, setPageLoading] = React.useState(false);
  const [bids, setBids] = React.useState<any>();

  React.useEffect(() => {
    setPageLoading(true);
    talentBids()
      .then((data: any) => {
        setBids(data.bids);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const navigateToJob = (jobId: string) => {
    navigate(pages.JOB.replace(":id", jobId));
  };

  return (
    <Container isPageLoading={pageLoading}>
      {bids &&
        bids.map((bid: any, index: any) => (
          <Box key={index} mb={2}>
            <Card>
              {bid?.talent_id === bid?.Job?.bid_winners?.[0] ? (
                <Chip label={"Winner"} variant="filled" color="warning" />
              ) : (
                <></>
              )}
              <CardContent>
                <Typography>{bid?.proposal}</Typography>

                <Box mt={1} display={"flex"}>
                  <Typography mr={1}>Bid at:</Typography>
                  <Typography>
                    Fixed Price - ${bid?.fix_rate}, Hourly Rate - ${bid.hourly_rate}.
                    Hours Required - {bid.jobTimeline} hours
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
                <Button variant="contained" onClick={() => navigateToJob(bid.job_id)}>
                  View Project Detail
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
    </Container>
  );
};

export default Bids;
