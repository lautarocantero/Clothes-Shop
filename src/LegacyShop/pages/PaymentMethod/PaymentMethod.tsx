import { Autocomplete, Box, Button, GridLegacy as Grid, TextField, Typography } from "@mui/material";
import LegacyShopLayout from "../../layout/LegacyShopLayout";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { identificationTypes, paymentMethods, shippingMethods } from "./helpers/PaymentMethodData";
import { savePurchase, startLoadingCart } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { type RootState as AuthRootState } from '../../../store/auth';
import { type RootState as UserRootState } from '../../../store/user';
import { useEffect, useRef, useState } from "react";
import { calculateTotalAmount } from "../../../helpers/calculateTotalAmount";
import { useSearchParams } from "react-router-dom";
import MercadoPagoWallet, { type purchaseType } from "./mercado-pago-checkouts/MercadoPagoWallet/MercadoPagoWallet";

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
        contact: Yup.string().email('Ingrese un email').required('Campo obligatorio').trim(),
        postalCode: Yup.number().required('Campo obligatorio'),
        shippingMethod: Yup.string().required('Campo obligatorio').trim(),
        notes: Yup.string().trim(),
        paymentMethod: Yup.string().required('Campo obligatorio').trim(),
        creditCardNumber: Yup.number()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('Número de tarjeta requerido'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardOwner: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('Nombre del titular requerido'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardExpirationDate: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('Fecha de expiración requerida'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardCvv: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'mercadopago',
            then: (schema) => schema.required('CVV requerido'),
            otherwise: (schema) => schema.notRequired(),
        }),
        identificationType: Yup.string().required('Campo obligatorio'),
        identificationNumber: Yup.string().required('Campo obligatorio'),
    }),
  );

  type purchaseStateOptions = 'approved' | 'fail' | 'pending' | null;

    const ThanksForBuying = ({paymentState, dispatch, userId}: {paymentState: purchaseStateOptions, dispatch: any, userId: string }) => {
        // http://localhost:5173/completar-compra?payment_state=approved&collection_id=127400578301&collection_status=approved&payment_id=127400578301&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=34338413311&preference_id=2714436498-856ce458-041c-4a5d-94d1-29f0bfa41d67&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
        const isValidState = (value: any): value is Exclude<purchaseStateOptions, null> =>
            ['approved', 'fail', 'pending'].includes(value);
        const alreadySaved = useRef(false);

        useEffect(() => {
        if (paymentState === 'approved' && !alreadySaved.current) {
            alreadySaved.current = true;
            dispatch(savePurchase({ userId }) as any);
        }
        }, [paymentState, userId, dispatch]);

        if (!isValidState(paymentState)) return null;


        return (
            <Box
                className="animate__animated animate__fadeInDown"
                sx={{
                    margin: "110px auto 50px",
                    width: { xs: "95%", md: "40%" },
                    backgroundColor: theme => theme?.palette?.primary?.main,
                    borderRadius: '20px',
                    color: theme => theme?.custom?.white,
                    padding: 2,
                    fontSize: theme => theme?.typography?.h1?.fontSize,
                }}
                >
                    {
                        paymentState === 'approved' && (
                            <span>
                                ¡Gracias por tu compra!
                            </span>
                        )
                    }
                    {
                        paymentState === 'fail' && (
                            <span>
                                ¡Algo salio mal, intentalo más tarde!
                            </span>
                        )
                    }
                    {
                        paymentState === 'pending' && (
                            <span>
                                Procesando pago...
                            </span>
                        )
                    }
            </Box>
        )
    }

    // type PaymentMethodFooterProps = {
    //     cart: productType[];
    //     startPurchase: boolean;
    //     values: any;
    // };

    const PaymentMethodFooter = ({ data, startPurchase }: any) => {
        const purchaseDataObject = {
            idUsuario: data?.id,
            email: data?.contact,
            postalCode: data?.postalCode,
            shippingMethod: data?.shippingMethod,
            identificationType: data?.identificationType,
            identificationNumber: data?.identificationNumber,
            cart: data?.cart,
            totalAmount: calculateTotalAmount(data?.cart),
        }

    if (data?.cart?.length === 0) {
        return (
        <Grid item xs={12} padding={2}>
            <Typography color="red" textAlign="center">
            Agrega productos al carrito para poder comprar
            </Typography>
        </Grid>
        );
    }

    return (
        <Grid item xs={12} display="flex" justifyContent="flex-end">
            { 
                startPurchase ? (
                    <MercadoPagoWallet data={purchaseDataObject as purchaseType}/>
                ) : ( 
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: {xs:'50%', md: '20%'} }}
                >
                    Continuar
                </Button>
                 )
            }
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

     const handlePreparePurchase = () => {
        setStartPurchase(true);
     }

     useEffect(() => {
        if(paymentState) setHasBougth(true);
     },[])

    useEffect(() => {
        // el error esta aca
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
                                    COMPLETAR COMPRA
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
                            label="Código Postal"
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
                                label="Método de envío"
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
                                    label="Método de pago"
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
                                label="Notas"
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
                                label="Número de tarjeta"
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
                                label="Titular de la tarjeta"
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
                                label="Fecha de expiración"
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
                                    label="Tipo de identificación"
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
                                label="Número de documento"
                                placeholder="12345678"
                                fullWidth
                                name="identificationNumber"
                                value={values?.identificationNumber}
                                onChange={({ target }) => setFieldValue('identificationNumber', target.value)}
                                error={!!errors?.identificationNumber}
                                helperText={errors?.identificationNumber?.toString()}
                                />
                            </Grid>
                            <PaymentMethodFooter data={{...values,cart,startPurchase, id}} startPurchase={startPurchase}/>
                            

                    </Grid>
                </Box>
            ) : <ThanksForBuying paymentState={paymentState as purchaseStateOptions} dispatch={dispatch} userId={id as string} />
        }
      
    </LegacyShopLayout>
  );
};

export default PaymentMethodPage;
