import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useDispatch, useSelector } from "react-redux";
import { login, createUsers } from "../../redux/thunks/users-thunk";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import { toValidateFeilds } from "../../validations/form-validations";
import FormFeilds from "../../components/molecules/form-feilds";
import loginfeildData from "../../utils/form-feilds/login-form-feilds.json";
import userRegisterfeildData from "../../utils/form-feilds/users-form-feilds.json";
import * as Yup from "yup";

const defaultTheme = createTheme();

const LoginAndSignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { auth, crudOperations } = useSelector((state: any) => state);
  const navigate = useNavigate();
  const [authType, setAuthType] = useState<"login" | "signUp">("login");
  const [loginValidationSchema, setLoginValidationSchema] =
    useState<Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">>();
  const [signUpValidationSchema, setSignUpValidationSchema] =
    useState<Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">>();

  useEffect(() => {
    setLoginValidationSchema(toValidateFeilds(loginfeildData));
    setSignUpValidationSchema(toValidateFeilds(userRegisterfeildData));
  }, [loginValidationSchema, signUpValidationSchema]);

  const userRegisterFormInitalValues = {
    firstname: "",
    email: "",
    phone: 0,
    password: "",
  };

  const loginInitalValues = {
    email: "",
    password: "",
  };

  const onFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
    if (authType === "signUp") {
      dispatch(createUsers(values, "signUp") as any);
      if (
        _.has(crudOperations, "dataSet.message") &&
        !_.isEmpty(crudOperations.dataSet)
      ) {
        const createdResponse = crudOperations.dataSet;
        toast.success(createdResponse.message, { position: "bottom-right" });
      }
    }
    if (authType === "login") {
      dispatch(login(values) as any);
      if (_.has(auth, "authData.message") && !_.isEmpty(auth.authData)) {
        const createdResponse = auth.authData;
        if (!_.isEmpty(createdResponse.data[0])) {
          localStorage.setItem(
            "userObject",
            JSON.stringify(createdResponse.data[0])
          );
        }
        toast.success(createdResponse.message, { position: "bottom-right" });
        if (
          !_.isUndefined(createdResponse.data[0].userRole) &&
          createdResponse.data[0].userRole === "ADMIN"
        ) {
          navigate("/admin/craft-category-management/");
        } else {
          navigate("/");
        }
      }
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="div" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {`Sign ${authType === "login" ? "In" : "Up"}`}
          </Typography>
          <Formik
            onSubmit={onFormSubmit}
            initialValues={
              authType === "login"
                ? loginInitalValues
                : userRegisterFormInitalValues
            }
            validationSchema={
              authType === "login"
                ? loginValidationSchema
                : signUpValidationSchema
            }
          >
            <Form>
              <FormFeilds
                feilds={
                  authType === "login" ? loginfeildData : userRegisterfeildData
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {`Sign ${authType === "login" ? "In" : "Up"}`}
              </Button>
            </Form>
          </Formik>
        </Box>
        <Typography
          component="body"
          style={{ fontSize: 14, float: "right", marginTop: 10 }}
        >
          Don't have an account yet ? {"   "}
          <a
            onClick={() =>
              setAuthType(authType === "login" ? "signUp" : "login")
            }
          >
            Sign Up
          </a>
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default LoginAndSignUp;
