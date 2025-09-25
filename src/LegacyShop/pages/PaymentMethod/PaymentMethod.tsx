import { Autocomplete, Box, Button, GridLegacy as Grid, TextField, Typography } from "@mui/material";
import LegacyShopLayout from "../../layout/LegacyShopLayout";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { identificationTypes, paymentMethods, shippingMethods } from "./helpers/PaymentMethodData";
import type { PurchaseProps } from "./helpers/types";
import { startBuyCart, startLoadingCart } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { type RootState as AuthRootState } from '../../../store/auth';
import { type RootState as UserRootState } from '../../../store/user';
import { useEffect, useState } from "react";
import { calculateTotalAmount } from "../../../helpers/calculateTotalAmount";
import type { productType } from "../LautyShopPage/types/productTypes";
import { useNavigate } from "react-router-dom";

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
            is: (value: string) => value !== 'efectivo',
            then: (schema) => schema.required('Número de tarjeta requerido'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardOwner: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'efectivo',
            then: (schema) => schema.required('Nombre del titular requerido'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardExpirationDate: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'efectivo',
            then: (schema) => schema.required('Fecha de expiración requerida'),
            otherwise: (schema) => schema.notRequired(),
        }),
        creditCardCvv: Yup.string()
        .when('paymentMethod', {
            is: (value: string) => value !== 'efectivo',
            then: (schema) => schema.required('CVV requerido'),
            otherwise: (schema) => schema.notRequired(),
        }),
        identificationType: Yup.string().required('Campo obligatorio'),
        identificationNumber: Yup.string().required('Campo obligatorio'),
    }),
  );

    const ThanksForBuying = () => {
        return (
            <Box sx={{ margin: "110px auto 50px", width: { xs: "95%", md: "40%" }, backgroundColor: theme => theme?.palette?.primary?.main, borderRadius: '20px' }}>
                <Typography sx={{ color: theme => theme?.custom?.white, padding: 2, fontSize: theme => theme?.typography?.h1?.fontSize}}>Gracias por tu compra!</Typography>
            </Box>
        )
    }

    type PaymentMethodFooterProps = {
        cart: productType[];
    };

    const PaymentMethodFooter = ({ cart }: PaymentMethodFooterProps) => {
    if (cart?.length === 0) {
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
        <Button
            variant="contained"
            type="submit"
            sx={{ width: {xs:'50%', md: '20%'} }}
        >
            Comprar
        </Button>
        </Grid>
    );
    };

const PaymentMethodPage = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state: UserRootState) => state.user);
    const { id, name } = useSelector((state: AuthRootState) => state.auth);
    const [hasBought, setHasBougth] = useState<boolean>(false);
    const navigate = useNavigate();

     const handleCompletePurchase = async(data: PurchaseProps) => {
         const purchaseObject = {...data, cart, totalAmount: calculateTotalAmount(cart), userId: id, purchaseDate: Date.now(), name}

         const response = await dispatch(startBuyCart(purchaseObject) as any);
         if(response){
             setHasBougth(true);
             await new Promise(resolve => setTimeout(resolve, 60000));
             navigate('/');
             return;
         }
         alert('Ocurrio un error en el proceso de compra');
     }

    useEffect(() => {
          if (!id) return; 
          dispatch(startLoadingCart({id} as any) as any);
        }, [dispatch, id]);

    const { handleSubmit, values, setFieldValue, errors} = 
        useFormik({
            initialValues: getInitialValues(),
            onSubmit: (data: PurchaseProps) => {
                handleCompletePurchase(data);
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

                        {values.paymentMethod !== 'efectivo' && (
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
                            <PaymentMethodFooter cart={cart}/>
                            

                    </Grid>
                </Box>
            ) : <ThanksForBuying/>
        }
      
    </LegacyShopLayout>
  );
};

export default PaymentMethodPage;
