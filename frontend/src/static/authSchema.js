import * as yup from "yup";

export const RegistrationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(10)
    .max(20)
    .required("Username is required"),
  email: yup.string().trim().email().required("Email is required"),
  password: yup.string().min(8).max(20).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).max(20).required("Password is required"),
});
