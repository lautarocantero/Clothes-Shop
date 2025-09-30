import { Autocomplete, Box, Button, GridLegacy as Grid, TextField, Typography } from "@mui/material";
import LegacyShopLayout from "../../layout/LegacyShopLayout";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { identificationTypes, paymentMethods, shippingMethods } from "./helpers/PaymentMethodData";
import { startLoadingCart } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { type RootState as AuthRootState } from '../../../store/auth';
import { type RootState as UserRootState } from '../../../store/user';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MercadoPagoWallet from "./mercado-pago-checkouts/MercadoPagoWallet/MercadoPagoWallet";
import ThanksForBuying from "./ThanksForBuying/ThanksForBuying";
import type { purchaseStateOptions } from "./PaymentMethodTypes";
import axios from "axios";

  const getInitialValues = () => ({
    contact: '',
    postalCode: 0,
    shippingMethod: '',
    notes: '',
    paymentMethod: '',
    creditCardNumber: 0,
    creditCardOwner: '',
    creditCardExpirationDate: '',
    creditCardCvv: '',
    identificationType: '',
    identificationNumber: '', 
  })

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        contact: Yup.string().email('Type a email').required('Required field').trim(),
        postalCode: Yup.number().required('Required field'),
        shippingMethod: Yup.string().required('Required field').trim(),
        notes: Yup.string().trim(),
        paymentMethod: Yup.string().required('Required field').trim(),
        creditCardNumber: Yup.number()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('Card number required'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardOwner: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('Card owner required'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardExpirationDate: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('expiration date required'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardCvv: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('CVV requerido'),
            otherwise: (schema) => schema.notRequired(),
        }),
        identificationType: Yup.string().required('Required field'),
        identificationNumber: Yup.string().required('Required field'),
    }),
  );


 const PaymentMethodFooter = ({ data, startPurchase, preferenceId }: any) => {
  if (data?.cart?.length === 0) {
    return (
      <Grid item xs={12} padding={2}>
        <Typography color="red" textAlign="center">
          Add products to the cart to be able to buy
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} display="flex" justifyContent="flex-end">
      {startPurchase ? (
        <MercadoPagoWallet preferenceId={preferenceId} />
      ) : (
        <Button
          variant="contained"
          type="submit"
          sx={{ width: { xs: "50%", md: "20%", color: theme => theme?.custom?.white } }}
        >
          Complete
        </Button>
      )}
    </Grid>
  );
};


const PaymentMethodPage = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state: UserRootState) => state.user);
    const { id } = useSelector((state: AuthRootState) => state.auth);
    const [hasBought, setHasBougth] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const paymentState = searchParams.get('payment_state');
    const [startPurchase, setStartPurchase] = useState<boolean>(false);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    const handlePreparePurchase = async () => {
    try {
        const response = await axios.post(
        "https://c5pjn0t4ne.execute-api.us-east-2.amazonaws.com/dev/mercadopago/create-preference-id",
        { cart },
        { headers: { "Content-Type": "application/json" } }
        );
        setPreferenceId(response.data?.id || null);
        setStartPurchase(true);
    } catch (error) {
        console.error("Error while creating preferenceId:", error);
    }
    };

     useEffect(() => {
        if(paymentState) setHasBougth(true);
     },[])

    useEffect(() => {
          if (!id) return; 
          if(paymentState !== 'approved')
            dispatch(startLoadingCart({id} as any) as any);
    }, [id, paymentState, dispatch]);



    const { handleSubmit, values, setFieldValue, errors} = 
        useFormik({
            initialValues: getInitialValues(),
            onSubmit: () => {
                handlePreparePurchase();
            },
            validateOnBlur: false,
            validateOnChange: false,
            validationSchema: getValidationSchema(),
    })

  return (
    <LegacyShopLayout>
        {
            !hasBought ? (
                <Box
                    component={"form"}
                    onSubmit={handleSubmit}
                    sx={{ margin: "110px auto 50px", width: { xs: "95%", md: "60%" } }}
                >
                    <Grid container spacing={2} padding={2}>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    backgroundColor: (theme) => theme.palette.primary.main,
                                    padding: 2,
                                    borderRadius: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                variant="h5"
                                color="white"
                                sx={{
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                                    overflowWrap: 'break-word',
                                }}
                                >
                                 Complete Purchase
                                </Typography>
                            </Box>
                            </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="E-mail"
                            type="email"
                            placeholder="jhondoe@gmail.com"
                            fullWidth
                            name="contact"
                            value={values?.contact}
                            onChange={({ target }: any) => setFieldValue('contact', target.value)}
                            error={!!errors.contact}
                            helperText={errors?.contact?.toString()}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="Postal Code"
                            type="number"
                            placeholder="5522"
                            fullWidth
                            name="postalCode"
                            value={values?.postalCode}
                            onChange={({ target }: any) => setFieldValue('postalCode', target.value)}
                            error={!!errors?.postalCode}
                            helperText={errors?.postalCode?.toString()}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                            fullWidth
                            options={shippingMethods}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Shipping Method"
                                error={!!errors.shippingMethod}
                                helperText={errors.shippingMethod?.toString()}
                                />
                            )}
                            value={shippingMethods.find((method) => method.value === values?.shippingMethod) || null}
                            onChange={(_, selectedOption) => setFieldValue('shippingMethod', selectedOption?.value || '')}
                            />
                        </Grid>

                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                fullWidth
                                options={paymentMethods}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    label="Payment Method"
                                    error={!!errors.paymentMethod}
                                    helperText={errors.paymentMethod?.toString()}
                                    />
                                )}
                                value={paymentMethods.find((method) => method.value === values?.paymentMethod) || null}
                                onChange={(_, selectedOption) => setFieldValue('paymentMethod', selectedOption?.value || '')}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                label="Notes"
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                onChange={({ target }: any) => setFieldValue('notes', target.value)}
                                />
                            </Grid>

                        {values.paymentMethod !== 'mercadopago' && (
                            <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                label="Card number"
                                type="number"
                                placeholder="4111 1111 1111 1111"
                                fullWidth
                                name="creditCardNumber"
                                value={values?.creditCardNumber}
                                onChange={({ target }: any) => setFieldValue('creditCardNumber', target.value)}
                                error={!!errors?.creditCardNumber}
                                helperText={errors?.creditCardNumber?.toString()}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                label="Card owner"
                                placeholder="Jhon Doe"
                                fullWidth
                                name="creditCardOwner"
                                value={values?.creditCardOwner}
                                onChange={({ target }) => setFieldValue('creditCardOwner', target.value)}
                                error={!!errors?.creditCardOwner}
                                helperText={errors?.creditCardOwner?.toString()}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                label="Expiration date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                // placeholder="MM/AA"
                                fullWidth
                                name="creditCardExpirationDate"
                                value={values?.creditCardExpirationDate}
                                onChange={({ target }) => setFieldValue('creditCardExpirationDate', target.value)}
                                error={!!errors?.creditCardExpirationDate}
                                helperText={errors?.creditCardExpirationDate?.toString()}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                label="CVV"
                                type="text"
                                placeholder="123"
                                fullWidth
                                name="creditCardCvv"
                                value={values?.creditCardCvv}
                                onChange={({ target }) => setFieldValue('creditCardCvv', target.value)}
                                error={!!errors?.creditCardCvv}
                                helperText={errors?.creditCardCvv?.toString()}
                                />
                            </Grid>
                            </>
                        )}
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                fullWidth
                                options={identificationTypes}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    label="Identification type"
                                    error={!!errors.identificationType}
                                    helperText={errors.identificationType?.toString()}
                                    />
                                )}
                                value={identificationTypes.find((method) => method.value === values?.identificationType) || null}
                                onChange={(_, selectedOption) => setFieldValue('identificationType', selectedOption?.value || '')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                label="Id number"
                                placeholder="12345678"
                                fullWidth
                                name="identificationNumber"
                                value={values?.identificationNumber}
                                onChange={({ target }) => setFieldValue('identificationNumber', target.value)}
                                error={!!errors?.identificationNumber}
                                helperText={errors?.identificationNumber?.toString()}
                                />
                            </Grid>
                            <PaymentMethodFooter data={{...values,cart,startPurchase, id}} startPurchase={startPurchase} preferenceId={preferenceId}/>
                            

                    </Grid>
                </Box>
            ) : <ThanksForBuying paymentState={paymentState as purchaseStateOptions} dispatch={dispatch} userId={id as string} />
        }
      
    </LegacyShopLayout>
  );
};

export default PaymentMethodPage;
