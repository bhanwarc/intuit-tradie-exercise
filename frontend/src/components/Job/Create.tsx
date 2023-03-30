import * as React from "react";
import { useFormik } from "formik";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useParams } from "react-router-dom";

import { Input, Textarea } from "components/Core/Inputs/Input";
import MultiSelect from "components/Core/Inputs/MultiSelect";
import Select from "components/Core/Inputs/Select";
import Container from "components/Core/Container";
import useQuery from "hooks/useQuery";
import { AlertType } from "typings/common";
import { EXPERTISE_LEVEL, JOB_TYPE, SKILLS } from "enums/form";
import { clientJob, createJob } from "api/api";
import { useCurrentUser } from "context/user";
import validationSchemas from "helpers/validation_schemas";

const Create = () => {
  const { id: jobId } = useParams();
  const queryParam = useQuery();
  const isNew = (queryParam.get("n") || "") === "true";

  const [pageLoading, setPageLoading] = React.useState(false);
  const [job, setJob] = React.useState<any>();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertType>();

  const { user } = useCurrentUser();
  const userId = user?.id;

  React.useEffect(() => {
    if (userId && jobId && !isNew) {
      setPageLoading(true);
      clientJob(userId, jobId)
        .then((data: any) => {
          setJob(data.job);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [userId, jobId, isNew]);

  const formik = useFormik({
    initialValues: {
      title: job?.title || "",
      description: job?.description || "",
      requiredSkills: job?.required_skills || [],
      optionalSkills: job?.optional_skills || [],
      requiredExpertiseLevel: job?.required_expertise_level || "",
      expectedProjectRate: job?.expected_project_rate || "",
      expectedHourlyRate: job?.expected_hourly_rate || "",
      jobType: job?.job_type || "",
      proposalDeadline: job?.proposal_deadline || "",
    },
    validationSchema: validationSchemas.create_job_schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        if (userId && jobId) {
          await createJob(userId, jobId, values);
          window.history.pushState({}, document.title, window.location.pathname);
          setAlert({
            show: true,
            type: "success",
            text: "Signup successful, try login!",
          });
        }
      } catch (err) {
        console.log(err);
        setAlert({
          show: true,
          type: "error",
          text: "Something went wrong, please try again!",
        });
      }

      setButtonLoading(false);
    },
  });

  return (
    <Container isPageLoading={pageLoading} alert={alert}>
      <Card>
        <CardHeader title={isNew ? "Create Project" : "Update Project"} />
        <CardContent>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Input
              label="Title"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <Textarea
              label="Description"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />

            <MultiSelect
              id={"requiredSkills"}
              labelId={"requiredSkills"}
              label={"Required Skill Set"}
              options={SKILLS}
              selectValue={formik.values.requiredSkills}
              setSelectValue={(value) => {
                formik.setFieldValue("requiredSkills", value);
              }}
              error={
                formik.touched.requiredSkills && Boolean(formik.errors.requiredSkills)
              }
              helperText={formik.errors.requiredSkills && formik.errors.requiredSkills}
            />

            <MultiSelect
              id={"optionalSkills"}
              labelId={"optionalSkills"}
              label={"Optional Skill Set"}
              options={SKILLS}
              selectValue={formik.values.optionalSkills}
              setSelectValue={(value) => {
                formik.setFieldValue("optionalSkills", value);
              }}
              error={
                formik.touched.optionalSkills && Boolean(formik.errors.optionalSkills)
              }
              helperText={formik.errors.optionalSkills && formik.errors.optionalSkills}
            />

            <Box mt={2}>
              <Select
                label="Experise Level"
                id="requiredExpertiseLevel"
                name="requiredExpertiseLevel"
                options={EXPERTISE_LEVEL}
                value={formik.values.requiredExpertiseLevel}
                onChange={(val: string) =>
                  formik.setFieldValue("requiredExpertiseLevel", val)
                }
                error={
                  formik.touched.requiredExpertiseLevel &&
                  Boolean(formik.errors.requiredExpertiseLevel)
                }
                helperText={
                  formik.errors.requiredExpertiseLevel &&
                  formik.errors.requiredExpertiseLevel
                }
              />
            </Box>

            <Stack
              direction="row"
              spacing={1}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Input
                label="Project Budget"
                id="expectedProjectRate"
                name="expectedProjectRate"
                type={"number"}
                value={formik.values.expectedProjectRate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.expectedProjectRate &&
                  Boolean(formik.errors.expectedProjectRate)
                }
                helperText={
                  formik.touched.expectedProjectRate && formik.errors.expectedProjectRate
                }
              />
              <Typography>OR</Typography>
              <Input
                style={{ marginTop: 8 }}
                label="Expected Hourly Rate"
                id="expectedHourlyRate"
                name="expectedHourlyRate"
                type={"number"}
                value={formik.values.expectedHourlyRate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.expectedHourlyRate &&
                  Boolean(formik.errors.expectedHourlyRate)
                }
                helperText={
                  formik.touched.expectedHourlyRate && formik.errors.expectedHourlyRate
                }
              />
            </Stack>

            <Box mt={2}>
              <Select
                label="Hire for?"
                id="jobType"
                name="jobType"
                options={JOB_TYPE}
                value={formik.values.jobType}
                onChange={(val: string) => formik.setFieldValue("jobType", val)}
                error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                helperText={formik.errors.jobType && formik.errors.jobType}
              />
            </Box>

            <Box my={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Accepting bid till?"
                  inputFormat="MM/DD/YYYY HH:mm"
                  value={formik.values.proposalDeadline}
                  onChange={(val) => formik.setFieldValue("proposalDeadline", val)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

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
        </CardContent>
      </Card>
    </Container>
  );
};

export default Create;
