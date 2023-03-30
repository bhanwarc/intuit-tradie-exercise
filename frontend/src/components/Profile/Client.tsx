import * as React from "react";
import { useFormik } from "formik";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Input } from "components/Core/Inputs/Input";
import Container from "components/Core/Container";
import Select from "components/Core/Inputs/Select";

import { AlertType } from "typings/common";
import { getClientProfile, updateClientProfile } from "api/api";
import { useCurrentUser } from "context/user";
import { TEAM_SIZES } from "enums/form";
import validationSchemas from "helpers/validation_schemas";

const Client = () => {
  const [pageLoading, setPageLoading] = React.useState(false);
  const [clientProfile, setClientProfile] = React.useState<any>();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertType>();

  const { user } = useCurrentUser();
  const userId = user?.id;

  React.useEffect(() => {
    if (userId) {
      setPageLoading(true);
      getClientProfile(userId)
        .then((data: any) => {
          setClientProfile(data.client);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      firstName: clientProfile?.first_name || "",
      lastName: clientProfile?.last_name || "",
      email: clientProfile?.email || "",
      companyName: clientProfile?.company_name || "",
      teamSize: clientProfile?.team_size || "",
    },
    validationSchema: validationSchemas.client_schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        if (userId) {
          await updateClientProfile(userId, values);
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
        <CardHeader title={"Profile"} />
        <CardContent>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Input
              label="First Name"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <Input
              label="Last Name"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <Input
              label="Email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Input
              label="Company Name"
              id="companyName"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
            />

            <Select
              label="Time Size"
              id="teamSize"
              name="teamSize"
              options={TEAM_SIZES}
              value={formik.values.teamSize}
              onChange={(val: string) => formik.setFieldValue("teamSize", val)}
              error={formik.touched.teamSize && Boolean(formik.errors.teamSize)}
              helperText={formik.touched.teamSize && formik.errors.teamSize}
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default Client;
