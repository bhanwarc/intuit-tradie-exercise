import * as React from "react";
import { Box, Chip, Container, Typography } from "@mui/material";

import moment from "moment";

const Bids = ({ bid, isWinner }: { bid: any; isWinner: boolean }) => {
  return (
    <Container>
      {isWinner ? <Chip label={"Winner"} variant="filled" color="warning" /> : <></>}
      <Box display={"flex"}>
        <Typography variant="h6" mr={1}>
          Proposal:
        </Typography>
        <Typography>{bid?.proposal}</Typography>
      </Box>

      <Box mt={1} display={"flex"}>
        <Typography variant="h6" mr={1}>
          Bid at:
        </Typography>
        <Typography>
          Fixed Price - ${bid?.fix_rate}, Hourly Rate - ${bid.hourly_rate}
        </Typography>
      </Box>

      <Box mt={1} display={"flex"}>
        <Typography variant="h6" mr={1}>
          Hours Required:
        </Typography>
        <Typography>{bid.job_timeline} hours</Typography>
      </Box>

      <Box mt={1} mb={2} display={"flex"}>
        <Typography variant="h6" mr={1}>
          Bid submited on:
        </Typography>
        <Typography>
          {bid?.created_at && moment(bid?.created_at).format("MM-DD-YYYY HH:mm")}
        </Typography>
      </Box>
    </Container>
  );
};

export default Bids;
