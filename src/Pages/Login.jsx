import React, { Fragment } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Footer, Header } from "../Components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRegister } from "../React-Query/Post";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSession } from "../config/session";

export default function Login() {
  const defaultValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email")
      .required("Email is Required")
      .min(10, "Email must be at least 10 characters")
      .max(140, "Email must be at most 140 characters"),
    userName: yup
      .string()
      .required("User Name is Required")
      .matches(
        /^([a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*([!@#$%^&*()+=\[\]{}|\\,.?\/`~])?)+$/,
        "User Name can only contain letters and numbers"
      )
      .min(6, "User Name must be at least 6 characters")
      .max(30, "User Name must be at most 30 characters"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be at most 30 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("Password is Required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const registerUserMutation = useRegister();
  const navigate = useNavigate();

  const onSubmit = async ({ email, userName, password, confirmPassword }) => {
    const registerData = {
      email,
      userName,
      password,
      confirmPassword,
    };

    const registerResponse = await registerUserMutation.mutateAsync(
      registerData
    );
    if (registerResponse.status === 201) {
      setSession("isAuthenticated", registerResponse?.data?._id);
      toast.success(`${registerResponse.statusText} Successfully`);
      navigate("/dashboard");
      reset();
    } else {
      toast.error(registerResponse.statusText);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="register-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <h2 className="text-center mb-4">Login</h2>
              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        {...field}
                        autoFocus="on"
                        type="text"
                        placeholder="Enter your username"
                        autoComplete="off"
                      />
                    </Form.Group>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="userName"
                  render={({ message }) => (
                    <p style={{ color: "red" }}> {message} </p>
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="off"
                      />
                    </Form.Group>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <p style={{ color: "red" }}> {message} </p>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="off"
                      />
                    </Form.Group>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p style={{ color: "red" }}> {message} </p>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        {...field}
                        type="password"
                        placeholder="Enter your Confirm password"
                        autoComplete="off"
                      />
                    </Form.Group>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => (
                    <p style={{ color: "red" }}> {message} </p>
                  )}
                />

                <Button
                  className="mt-5"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
}
