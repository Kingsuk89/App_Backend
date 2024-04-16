import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const RegisterSchema = yup.object({
  fullName: yup
    .string()
    .required("Please enter your name")
    .min(3, "Please enter minium 3 character")
    .max(25, "You touch character limit"),
  email: yup
    .string()
    .email("This not look like mail")
    .required("Please enter your valid email"),
  password: yup
    .string()
    .password()
    .required("Please enter your password")
    .minLowercase(1, "Please enter one lowercase latter ")
    .min(8, "Password must be 8 character")
    .minUppercase(1, "Please enter one uppercase latter")
    .minLowercase(1, "Please enter one number")
    .minSymbols(1, "Please enter one symbol"),
});

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("This not look like mail")
    .required("Please enter your valid email"),
  password: yup.string().required("Please enter your password"),
});

export const requestSchema = yup.object({
  email: yup
    .string()
    .email("This not look like mail")
    .required("Please enter your valid email"),
});

export const resetSchema = yup.object({
  password: yup
    .string()
    .password()
    .required("Please enter your password")
    .minLowercase(1, "Please enter one lowercase latter ")
    .min(8, "Password must be 8 character")
    .minUppercase(1, "Please enter one uppercase latter")
    .minLowercase(1, "Please enter one number")
    .minSymbols(1, "Please enter one symbol"),
  authCode: yup.number().required("Enter 6 digit code"),
});
