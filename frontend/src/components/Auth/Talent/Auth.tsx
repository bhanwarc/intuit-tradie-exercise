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

const Home = () => {
  const [talentLoginLoading, setTalentLoginLoading] = React.useState(false);
  const [talentSignupLoading, setTalentSignupLoading] = React.useState(false);
  const [talentForm, setTalentForm] = React.useState("1");
  const [alert, setAlert] = React.useState<AlertType>();

  const { setGlobalState } = useCurrentState();

  const navigate = useNavigate();

  const changeTalentForm = (event: React.SyntheticEvent, newValue: string) => {
    setTalentForm(newValue);
  };

  React.useEffect(() => {
    localStorage.setItem("client", "false");
  });

  const talentLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemas.signin_schema,
    onSubmit: async (values, { resetForm }) => {
      setTalentLoginLoading(true);
      try {
        await signIn(values.email, values.password);
        setGlobalState({
          isLoggedin: true,
          isClient: false,
        });
        navigate(pages.JOBS);
      } catch (err) {
        console.log(err);
        setAlert({
          show: true,
          type: "error",
          text: "Something went wrong, please try again!",
        });
      }
      resetForm();
      setTalentLoginLoading(false);
    },
  });

  const talentSignup = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchemas.signup_schema,
    onSubmit: async (values, { resetForm }) => {
      setTalentSignupLoading(true);
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
      setTalentSignupLoading(false);
    },
  });

  return (
    <Container alert={alert}>
      <Grid container spacing={2} my={12} justifyContent={"center"}>
        {/* talent */}
        <Grid item xs={6}>
          <Card>
            <CardHeader title={"Tradie"} />
            <TabContext value={talentForm}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={changeTalentForm} aria-label="lab API tabs example">
                  <Tab label="Login" value="1" />
                  <Tab label="Signup" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box component="form" onSubmit={talentLogin.handleSubmit} sx={{ mt: 1 }}>
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    value={talentLogin.values.email}
                    onChange={talentLogin.handleChange}
                    onBlur={talentLogin.handleBlur}
                    error={talentLogin.touched.email && Boolean(talentLogin.errors.email)}
                    helperText={talentLogin.touched.email && talentLogin.errors.email}
                  />

                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={talentLogin.values.password}
                    onChange={talentLogin.handleChange}
                    onBlur={talentLogin.handleBlur}
                    error={
                      talentLogin.touched.password && Boolean(talentLogin.errors.password)
                    }
                    helperText={
                      talentLogin.touched.password && talentLogin.errors.password
                    }
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    loading={talentLoginLoading}
                    sx={{ my: 2 }}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box component="form" onSubmit={talentSignup.handleSubmit} sx={{ mt: 1 }}>
                  <Input
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={talentSignup.values.firstName}
                    onChange={talentSignup.handleChange}
                    onBlur={talentSignup.handleBlur}
                    error={
                      talentSignup.touched.firstName &&
                      Boolean(talentSignup.errors.firstName)
                    }
                    helperText={
                      talentSignup.touched.firstName && talentSignup.errors.firstName
                    }
                  />
                  <Input
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={talentSignup.values.lastName}
                    onChange={talentSignup.handleChange}
                    onBlur={talentSignup.handleBlur}
                    error={
                      talentSignup.touched.lastName &&
                      Boolean(talentSignup.errors.lastName)
                    }
                    helperText={
                      talentSignup.touched.lastName && talentSignup.errors.lastName
                    }
                  />
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    value={talentSignup.values.email}
                    onChange={talentSignup.handleChange}
                    onBlur={talentSignup.handleBlur}
                    error={
                      talentSignup.touched.email && Boolean(talentSignup.errors.email)
                    }
                    helperText={talentSignup.touched.email && talentSignup.errors.email}
                  />

                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={talentSignup.values.password}
                    onChange={talentSignup.handleChange}
                    onBlur={talentSignup.handleBlur}
                    error={
                      talentSignup.touched.password &&
                      Boolean(talentSignup.errors.password)
                    }
                    helperText={
                      talentSignup.touched.password && talentSignup.errors.password
                    }
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    loading={talentSignupLoading}
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

export default Home;
