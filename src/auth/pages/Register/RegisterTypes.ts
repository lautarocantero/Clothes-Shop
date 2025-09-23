import type { FormikErrors, FormikValues } from "formik";

export interface RegisterProps {
  email: string,
  password: string,
  displayName: string,
}

export type RegisterFormType = {
    displayName: string,
    email: string, 
    password: string, 
    repeatPassword: string, 
    setFieldValue: (
      field: string,
      value: string | number | boolean,
      shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<{ email: string; password: string }>>;
    onGoBack: () => void, 
    errorMessage: string,
    errors: FormikErrors<FormikValues>;
    ActionTitle: string,
  }