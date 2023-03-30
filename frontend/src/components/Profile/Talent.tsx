import * as React from "react";
import { useFormik } from "formik";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Input, Textarea } from "components/Core/Inputs/Input";
import Container from "components/Core/Container";
import MultiSelect from "components/Core/Inputs/MultiSelect";

import { AlertType } from "typings/common";
import { getTalentProfile, updateTalentProfile } from "api/api";
import { useCurrentUser } from "context/user";
import { SKILLS } from "enums/form";
import validationSchemas from "helpers/validation_schemas";

const Talent = () => {
  const [pageLoading, setPageLoading] = React.useState(false);
  const [talentProfile, setTalentProfile] = React.useState<any>();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertType>();

  const { user } = useCurrentUser();
  const userId = user?.id;

  React.useEffect(() => {
    if (userId) {
      setPageLoading(true);
      getTalentProfile(userId)
        .then((data: any) => {
          setTalentProfile(data.talent);
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
      firstName: talentProfile?.first_name || "",
      lastName: talentProfile?.last_name || "",
      email: talentProfile?.email || "",
      title: talentProfile?.title || "",
      description: talentProfile?.description || "",
      skills: talentProfile?.skills || [],
    },
    validationSchema: validationSchemas.talent_schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        if (userId) {
          await updateTalentProfile(userId, values);
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
              id={"skills"}
              labelId={"skills"}
              label={"Skills"}
              options={SKILLS}
              selectValue={formik.values.skills}
              setSelectValue={(value) => {
                formik.setFieldValue("skills", value);
              }}
              placeholder={"Skills"}
              error={formik.touched.skills && Boolean(formik.errors.skills)}
              helperText={formik.errors.skills && formik.errors.skills}
            />

            <LoadingButton
              fullWidth
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

export default Talent;
