import React, { useState } from "react";
import LayoutAuthentication from "layout/LayoutAuthentication";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Label from "components/label/Label";
import { Input } from "components/input";
import FormGroup from "components/common/FormGroup";
import { Button, ButtonGoogle } from "components/button";
import { Checkbox } from "components/checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconEyeToggle } from "components/icon";
import useToggleValue from "hooks/useToggleValue";
import { useDispatch } from "react-redux";
import { authRegister } from "store/auth/auth-slice";
// import { permissons } from "constants/permissons";
const schema = yup.object({
  name: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character "),
});
const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const handleSignUp = (values) => {
    try {
      dispatch(authRegister({ ...values, permissions: [] }));
      reset({});
    } catch (error) {}
  };
  const { handleToggleValue: handleToggleTerm, value: acceptTerm } =
    useToggleValue();
  const { handleToggleValue: handleTogglePassword, value: showPassword } =
    useToggleValue();

  return (
    <LayoutAuthentication heading={"SignUp"}>
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Already have an account?{" "}
        <Link to="/login" className="font-medium underline text-primary">
          Sign in
        </Link>
      </p>
      <ButtonGoogle></ButtonGoogle>
      <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2 dark:text-white ">
        Or sign up with email
      </p>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormGroup>
          <Label htmlFor="name">Full name*</Label>
          <Input
            control={control}
            name="name"
            placeholder="Enter your full name"
            error={errors.name?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email*</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password*</Label>
          <Input
            control={control}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <div className="flex items-start mb-5 gap-x-5">
          <Checkbox name="term" checked={acceptTerm} onClick={handleToggleTerm}>
            <p className="flex-1 text-xs lg:text-sm text-text2 dark:text-text3">
              I agree to the
              <span className="underline text-secondary">Terms of Use</span> and
              have read and understand the
              <span className="underline text-secondary">Privacy policy.</span>
            </p>
          </Checkbox>
        </div>
        <Button type="submit" className="w-full " kind="primary">
          Create my account
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
