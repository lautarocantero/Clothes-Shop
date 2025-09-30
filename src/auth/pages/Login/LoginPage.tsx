import { Box, Button, GridLegacy as Grid, Link, TextField, Typography } from "@mui/material";
import { startCleanAuthMessage, startLoginWithEmailPassword, type RootState } from "../../../store/auth";
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import AuthLayout from "../../layout/AuthLayout";
import ErrorExpositure from "../helpers/ErrorExpositure";


  const getInitialValues = () => ({
    email: '',
    password: '',
  })

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        email: Yup.string()
          .email('Type a email')
          .required('Required field')
          .trim(),
        password: Yup.string().required('Required field'),
      }),
  );
  
  const LoginPage = () => {
    const dispatch = useDispatch();
    const errorFromStore = useSelector((state: RootState) => state.auth.errorMessage);
    const [errorMessage, setErrorMessage] = useState(errorFromStore ?? '');
    
    useEffect(() => {
        setErrorMessage(errorFromStore ?? '');
    }, [errorFromStore]);

    const onLogin = ({ email, password }: { email: string; password: string }) => {
      dispatch(startLoginWithEmailPassword({email, password}) as any);
    }

    const { handleSubmit, values, setFieldValue, errors} = 
    useFormik({
      initialValues: getInitialValues(),
      onSubmit: (data: { email: string; password: string}) => {
        onLogin({
          email: data.email.trim(),
          password: data.password,
        });
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: getValidationSchema(),
    })

  return (
    <AuthLayout title={'Login'}>
        <Box component={"form"} onSubmit={handleSubmit} p={2} sx={{ 
          width: {xs: '100%', md: '20%'},
          margin: '0 auto',
          backgroundColor: theme => theme?.custom?.white,
          borderRadious: '80%',
        }}>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                name="email"
                onChange={({ target }: any) => {
                  setFieldValue('email', target.value);
                }}
                placeholder="E-mail"
                type="email" 
                value={values?.email}
                label="e-mail" 
                error={!!errors.email}
                helperText={(errors?.email)?.toString()}
                />

            </Grid>
            <Grid item xs={12} sm={12} sx={{ mt: '10px'}}>
              <TextField
                label="password" 
                type="password" 
                placeholder="Password"
                fullWidth
                name="password"
                value={values?.password}
                onChange={({ target }: any) => {
                  setFieldValue('password', target.value);
                }}
                error={!!errors.password}
                helperText={(errors?.password)?.toString()}
              />
            </Grid>
            <ErrorExpositure errorMessage={errorMessage}/>
            <Grid container direction={'column'} spacing={2} sx={{ mt: 2}}>
              <Grid item xs={12} sm={6}>
                <Button
                fullWidth
                variant='contained'
                type="submit"
                sx={{ color: theme => theme?.palette?.secondary?.main }}
                >
                  Login
                </Button>
              </Grid>

              <Grid container direction={'row'} justifyContent={'end'} sx={{ mt: 2}}>
                <Link component={LinkRouter} to={'/auth/register'} onClick={() => dispatch(startCleanAuthMessage() as any)}>
                  <Typography sx={{ color: theme => theme?.palette?.primary?.main }}>Sign up</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
    </AuthLayout>
  )
}

export default LoginPage
