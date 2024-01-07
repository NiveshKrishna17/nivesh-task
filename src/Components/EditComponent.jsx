import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "react-bootstrap";
import { useUpdate } from "../React-Query/Post";
import toast from "react-hot-toast";
import { queryClient } from "../React-Query";

export default function EditComponent({ singleData, toggle }) {
  useEffect(() => {
    if (singleData) {
      setValue("userName", singleData?.userName);
      setValue("password", singleData?.password);
      setValue("email", singleData?.email);
      setValue("confirmPassword", singleData?.confirmPassword);
    }
  }, [singleData]);

  const defaultValues = {
    userName: "",
    password: "",
    email: "",
    confirmPassword: "",
  };

  const schema = yup.object().shape({
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
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    email: yup
      .string()
      .email("Invalid Email")
      .required("Email is Required")
      .min(10, "Email must be at least 10 characters")
      .max(140, "Email must be at most 140 characters"),
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
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const updateMutation = useUpdate();
  const onSubmit = async ({ email, userName, password, confirmPassword }) => {
    const editData = {
      userName,
      password,
      email,
      confirmPassword,
    };
    const updateRes = await updateMutation.mutateAsync({
      id: singleData?._id,
      data: editData,
    });
    if (updateRes?.status === 200) {
      toggle();
      queryClient.refetchQueries("table");
      reset();
      toast.success(updateRes.statusText);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                {...field}
                autoFocus="on"
                type="text"
                id="name"
                placeholder="Enter Name"
              />
            </FormGroup>
          )}
        />
        <ErrorMessage
          errors={errors}
          name="userName"
          render={({ message }) => <p style={{ color: "red" }}> {message} </p>}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                {...field}
                type="email"
                id="name"
                placeholder="Enter Your email"
              />
            </FormGroup>
          )}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p style={{ color: "red" }}> {message} </p>}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                {...field}
                type="password"
                id="password"
                placeholder="Enter Your Password"
              />
            </FormGroup>
          )}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p style={{ color: "red" }}> {message} </p>}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                {...field}
                type="password"
                id="confirmPassword"
                placeholder="Enter Your Confirm Password"
              />
            </FormGroup>
          )}
        />
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => <p style={{ color: "red" }}> {message} </p>}
        />
        <Button
          className="mt-5 ml-5"
          variant="primary"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
