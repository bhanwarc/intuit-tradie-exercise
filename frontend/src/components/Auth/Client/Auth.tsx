import * as React from "react";
import { useFormik } from "formik";
import { Box, Card, CardHeader, Grid, Tab } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import { Input } from "components/Core/Inputs/Input";
import Container from "components/Core/Container";

import { signIn, signUp } from "helpers/auth";
import { AlertType } from "typings/common";
import pages from "enums/pages";
import { useCurrentState } from "context/global";
import validationSchemas from "helpers/validation_schemas";

const Auth = () => {
  const [clientLoginLoading, setClientLoginLoading] = React.useState(false);
  const [clientSignupLoading, setClientSignupLoading] = React.useState(false);
  const [clientForm, setClientForm] = React.useState("1");
  const [alert, setAlert] = React.useState<AlertType>();

  const { setGlobalState } = useCurrentState();

  const navigate = useNavigate();

  const changeClientForm = (event: React.SyntheticEvent, newValue: string) => {
    setClientForm(newValue);
  };

  React.useEffect(() => {
    localStorage.setItem("client", "true");
  });

  const clientLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemas.signin_schema,
    onSubmit: async (values, { resetForm }) => {
      setClientLoginLoading(true);
      try {
        await signIn(values.email, values.password);
        setGlobalState({
          isLoggedin: true,
          isClient: true,
        });
        navigate(pages.CLIENT_JOBS);
      } catch (err) {
        console.log(err);
        setAlert({
          show: true,
          type: "error",
          text: "Something went wrong, please try again!",
        });
      }
      resetForm();
      setClientLoginLoading(false);
    },
  });

  const clientSignup = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchemas.signup_schema,
    onSubmit: async (values, { resetForm }) => {
      setClientSignupLoading(true);
      try {
        await signUp(values.email, values.password, values.firstName, values.lastName);
        setAlert({
          show: true,
          type: "success",
          text: "Signup successful, try login!",
        });
      } catch (err) {
        console.log(err);
        setAlert({
          show: true,
          type: "error",
          text: "Something went wrong, please try again!",
        });
      }
      resetForm();
      setClientSignupLoading(false);
    },
  });

  return (
    <Container alert={alert}>
      <Grid container spacing={2} my={12} justifyContent={"center"}>
        {/* client */}
        <Grid item xs={6}>
          <Card>
            <CardHeader title={"Customer"} />
            <TabContext value={clientForm}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={changeClientForm} aria-label="lab API tabs example">
                  <Tab label="Login" value="1" />
                  <Tab label="Signup" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box component="form" onSubmit={clientLogin.handleSubmit} sx={{ mt: 1 }}>
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    value={clientLogin.values.email}
                    onChange={clientLogin.handleChange}
                    onBlur={clientLogin.handleBlur}
                    error={clientLogin.touched.email && Boolean(clientLogin.errors.email)}
                    helperText={clientLogin.touched.email && clientLogin.errors.email}
                  />

                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={clientLogin.values.password}
                    onChange={clientLogin.handleChange}
                    onBlur={clientLogin.handleBlur}
                    error={
                      clientLogin.touched.password && Boolean(clientLogin.errors.password)
                    }
                    helperText={
                      clientLogin.touched.password && clientLogin.errors.password
                    }
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    loading={clientLoginLoading}
                    sx={{ my: 2 }}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box component="form" onSubmit={clientSignup.handleSubmit} sx={{ mt: 1 }}>
                  <Input
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={clientSignup.values.firstName}
                    onChange={clientSignup.handleChange}
                    onBlur={clientSignup.handleBlur}
                    error={
                      clientSignup.touched.firstName &&
                      Boolean(clientSignup.errors.firstName)
                    }
                    helperText={
                      clientSignup.touched.firstName && clientSignup.errors.firstName
                    }
                  />
                  <Input
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={clientSignup.values.lastName}
                    onChange={clientSignup.handleChange}
                    onBlur={clientSignup.handleBlur}
                    error={
                      clientSignup.touched.lastName &&
                      Boolean(clientSignup.errors.lastName)
                    }
                    helperText={
                      clientSignup.touched.lastName && clientSignup.errors.lastName
                    }
                  />
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    value={clientSignup.values.email}
                    onChange={clientSignup.handleChange}
                    onBlur={clientSignup.handleBlur}
                    error={
                      clientSignup.touched.email && Boolean(clientSignup.errors.email)
                    }
                    helperText={clientSignup.touched.email && clientSignup.errors.email}
                  />

                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={clientSignup.values.password}
                    onChange={clientSignup.handleChange}
                    onBlur={clientSignup.handleBlur}
                    error={
                      clientSignup.touched.password &&
                      Boolean(clientSignup.errors.password)
                    }
                    helperText={
                      clientSignup.touched.password && clientSignup.errors.password
                    }
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    loading={clientSignupLoading}
                    sx={{ my: 2 }}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </TabPanel>
            </TabContext>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;
