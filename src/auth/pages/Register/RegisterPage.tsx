import { Box, Button, GridLegacy as Grid, TextField } from "@mui/material"
import { startCleanAuthMessage, startCreateUserWithEmailAndPassword, type RootState } from "../../../store/auth";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import AuthLayout from "../../layout/AuthLayout"
import React, { useEffect, useState } from "react";
import type { RegisterFormType, RegisterProps } from "./RegisterTypes";
import ErrorExpositure from "../helpers/ErrorExpositure";

  const getInitialValues = () => ({
    email: '',
    password: '',
    repeatPassword: '',
    displayName: '',
  })

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        displayName: Yup.string().required('Campo obligatorio'),
        email: Yup.string()
          .email('Ingrese un email')
          .required('Campo obligatorio')
          .trim(),
        password: Yup.string().required('Campo obligatorio'),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
          .required('Repite la contraseña'),
      }),
  );

  const FormFields = ({
    displayName,
    email, 
    password, 
    repeatPassword, 
    errorMessage, 
    onGoBack,
    setFieldValue,
    errors,  
    ActionTitle}: RegisterFormType) => {
    return (
      <Grid container direction={'column'}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name='displayName'
              onChange={({ target }: any) => {
                setFieldValue('displayName', target.value);
              }}
              placeholder='jhon Doe'
              type='text'
              value={displayName} 
              label='Nombre'
              error={!!errors.displayName}
              helperText={(errors?.displayName)?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <TextField
              fullWidth
              name='email'
              onChange={({ target }: any) => {
                setFieldValue('email', target.value);
              }}
              placeholder='jhonDoe@gmail.com'
              type='email'
              value={email}
              label='Email'
              error={!!errors.email}
              helperText={(errors?.email)?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <TextField
              fullWidth
              name='password'
              onChange={({ target }: any) => {
                setFieldValue('password', target.value);
              }}
              type='password'
              value={password}
              label='Contraseña'
              error={!!errors?.password}
              helperText={(errors?.password)?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <TextField
              fullWidth
              name='repeatPassword'
              onChange={({ target }: any) => {
                setFieldValue('repeatPassword', target.value);
              }}
              type='password'
              value={repeatPassword}
              label='Repite la Contraseña'error={!!errors?.repeatPassword}
              helperText={(errors?.repeatPassword)?.toString()}
            />
          </Grid>
          <ErrorExpositure errorMessage={errorMessage} />
          <Grid container display={'flex'} gap={{xs: 2, md: 0}}
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between'}}
          >
              <Grid item xs={12} sm={4}>
                <Button
                fullWidth
                variant='contained'
                onClick={onGoBack}
                >
                  Volver
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant='contained'
                  type="submit"
                >
                  {ActionTitle}
                </Button>
              </Grid>
            </Grid>
        </Grid>
    )
  }

const RegisterPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorFromStore = useSelector((state: RootState) => state.auth.errorMessage);
  const [errorMessage, setErrorMessage] = useState(errorFromStore ?? '');

  useEffect(() => {
    setErrorMessage(errorFromStore ?? '');
  }, [errorFromStore]);

  const onRegister = ({displayName, email, password}: RegisterProps) => {
      dispatch(startCreateUserWithEmailAndPassword({ email, password, displayName }) as any);
  }

  const onGoBack = () => {
    navigate('/auth/login', {
      replace: true,
    });
    dispatch(startCleanAuthMessage() as any);
  }

  const { handleSubmit, values, setFieldValue, errors} = 
    useFormik({
      initialValues: getInitialValues(),
      onSubmit: (data: { displayName: string; email: string; password: string, repeatPassword: string }) => {
        onRegister({
          displayName: data?.displayName,
          email: data.email.trim(),
          password: data.password,
        });
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: getValidationSchema(),
    })

  return (
    <AuthLayout title={'Registro'}>
      <Box 
        component={"form"}
        onSubmit={handleSubmit} 
        sx={{ backgroundColor: theme => theme?.custom?.white, width: {xs: '100%',md:'30%'}, margin: '0 auto' }} 
        p={2} 
      >
        <FormFields 
          displayName={values.displayName}
          email={values.email}
          password={values.password}
          repeatPassword={values.repeatPassword}
          setFieldValue={setFieldValue}
          errors={errors}
          errorMessage={errorMessage}
          onGoBack={onGoBack}
          ActionTitle={'Registrarse'}
        />
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage
