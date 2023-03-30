import * as React from "react";
import { useFormik } from "formik";
import { Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Input, Textarea } from "components/Core/Inputs/Input";
import Container from "components/Core/Container";

import { AlertType } from "typings/common";
import { placeBid } from "api/api";
import validationSchemas from "helpers/validation_schemas";

const PlaceBid = ({ jobId }: { jobId: string }) => {
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertType>();

  const formik = useFormik({
    initialValues: {
      proposal: "",
      fixRate: "",
      hourlyRate: "",
      jobTimeline: "",
    },
    validationSchema: validationSchemas.place_bid_schema,
    onSubmit: async (values, { resetForm }) => {
      setButtonLoading(true);
      try {
        await placeBid(jobId, values);
        setAlert({
          show: true,
          type: "success",
          text: "Signup successful, try login!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        console.log(err);
        setAlert({
          show: true,
          type: "error",
          text: "Something went wrong, please try again!",
        });
      }
      resetForm();
      setButtonLoading(false);
    },
  });

  return (
    <Container alert={alert}>
      <Typography variant="h5" mb={2}>
        Place A Bid
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <Textarea
          label="Proposal"
          id="proposal"
          name="proposal"
          value={formik.values.proposal}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.proposal && Boolean(formik.errors.proposal)}
          helperText={formik.touched.proposal && formik.errors.proposal}
        />

        <Stack
          direction="row"
          spacing={1}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Input
            label="Fixed Price"
            id="fixRate"
            name="fixRate"
            type={"number"}
            value={formik.values.fixRate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fixRate && Boolean(formik.errors.fixRate)}
            helperText={formik.touched.fixRate && formik.errors.fixRate}
          />
          <Typography>OR</Typography>
          <Input
            style={{ marginTop: 8 }}
            label="Hourly Rate"
            id="hourlyRate"
            name="hourlyRate"
            type={"number"}
            value={formik.values.hourlyRate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hourlyRate && Boolean(formik.errors.hourlyRate)}
            helperText={formik.touched.hourlyRate && formik.errors.hourlyRate}
          />
        </Stack>

        <Input
          label="Hours required to complete the job"
          id="jobTimeline"
          name="jobTimeline"
          type={"number"}
          value={formik.values.jobTimeline}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.jobTimeline && Boolean(formik.errors.jobTimeline)}
          helperText={formik.touched.jobTimeline && formik.errors.jobTimeline}
        />

        <LoadingButton
          size="large"
          variant="contained"
          loading={buttonLoading}
          sx={{ my: 2 }}
          type="submit"
        >
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default PlaceBid;
