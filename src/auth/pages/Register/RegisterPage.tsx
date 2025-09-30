import { Autocomplete, Box, Button, GridLegacy as Grid, TextField } from "@mui/material"
import { roles } from "../../types/AuthTypes";
import { startCleanAuthMessage, startCreateUserWithEmailAndPassword, type RootState } from "../../../store/auth";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import AuthLayout from "../../layout/AuthLayout"
import ErrorExpositure from "../helpers/ErrorExpositure";
import type { RegisterFormType, RegisterProps } from "./RegisterTypes";

  const getInitialValues = () => ({
    email: '',
    password: '',
    repeatPassword: '',
    displayName: '',
    rol: '',
  })

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        displayName: Yup.string().required('Required field'),
        email: Yup.string()
          .email('Type a email')
          .required('Required field')
          .trim(),
        password: Yup.string().required('Required field'),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'The passwords do not match')
          .required('Repeat password'),
        rol: Yup.string().required('Required field'),
      }),
  );



  const FormFields = ({
    displayName,
    email, 
    password, 
    repeatPassword, 
    rol,
    errorMessage, 
    onGoBack,
    setFieldValue,
    errors,  
    ActionTitle}: RegisterFormType) => {
    return (
      <Grid container direction={'column'}>
          <Grid xs={12} sm={12}>
            <TextField
              fullWidth
              name='displayName'
              onChange={({ target }: any) => {
                setFieldValue('displayName', target.value);
              }}
              placeholder='jhon Doe'
              type='text'
              value={displayName} 
              label='Name'
              error={!!errors.displayName}
              helperText={(errors?.displayName)?.toString()}
            />
          </Grid>
          <Grid xs={12} sm={12} mt={2}>
            <TextField
              fullWidth
              name='email'
              onChange={({ target }: any) => {
                setFieldValue('email', target.value);
              }}
              placeholder='jhonDoe@gmail.com'
              type='email'
              value={email}
              label="E-mail" 
              error={!!errors.email}
              helperText={(errors?.email)?.toString()}
            />
          </Grid>
          <Grid xs={12} sm={12} mt={2}>
            <TextField
              fullWidth
              name='password'
              onChange={({ target }: any) => {
                setFieldValue('password', target.value);
              }}
              type='password'
              value={password}
              label='Password'
              error={!!errors?.password}
              helperText={(errors?.password)?.toString()}
            />
          </Grid>
          <Grid xs={12} sm={12} mt={2}>
            <TextField
              fullWidth
              name='repeatPassword'
              onChange={({ target }: any) => {
                setFieldValue('repeatPassword', target.value);
              }}
              type='password'
              value={repeatPassword}
              label='Repeat password'error={!!errors?.repeatPassword}
              helperText={(errors?.repeatPassword)?.toString()}
            />
          </Grid>
          <Grid xs={12} sm={12} mt={2}>
              <Autocomplete
                fullWidth
                options={roles}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rol"
                    error={!!errors.rol}
                    helperText={errors.rol?.toString()}
                  />
                )}
                value={roles.find((role) => role.value === rol) || null}
                onChange={(_, selectedOption) => {
                  setFieldValue('rol', selectedOption?.value || '');
                }}
              />
          </Grid>
          <ErrorExpositure errorMessage={errorMessage} />
          <Grid container gap={{xs: 2, sm: 0}}
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between'}}
              flexWrap={'wrap'}
          >
              <Grid xs={12} sm={4}>
                <Button
                fullWidth
                variant='contained'
                onClick={onGoBack}
                sx={{color: theme => theme?.palette?.secondary?.main}}
                >
                  Back
                </Button>
              </Grid>
              <Grid xs={12} sm={4}>
                <Button
                  fullWidth
                  variant='contained'
                  type="submit"
                  sx={{color: theme => theme?.palette?.secondary?.main}}
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

  const onRegister = ({displayName, email, password, rol}: RegisterProps) => {
      dispatch(startCreateUserWithEmailAndPassword({ email, password, displayName, rol }) as any);
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
      onSubmit: (data: { displayName: string; email: string; password: string, repeatPassword: string, rol: string }) => {
        onRegister({
          displayName: data?.displayName,
          email: data.email.trim(),
          password: data.password,
          rol: data.rol,
        });
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: getValidationSchema(),
    })

  return (
    <AuthLayout title={'Sign up'}>
      <Box 
        component={"form"}
        onSubmit={handleSubmit} 
        sx={{ backgroundColor: theme => theme?.custom?.white, width: {xs: '100%',sm:'60%', md: '40%'}, margin: '0 auto' }} 
        p={2} 
      >
        <FormFields 
          {...values}
          setFieldValue={setFieldValue}
          errors={errors}
          errorMessage={errorMessage}
          onGoBack={onGoBack}
          ActionTitle={'Sign up'}
        />
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage


