import { useEffect, useMemo, useState } from "react";

type ValidationFunction = (value: string) => boolean;

type FormValidation = {
  [key: string]: [ValidationFunction, string];
};

const useForm = (initialForm: any = {}, formValidations?: FormValidation ) => {

    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

    useEffect(() => {
      createValidators();
    }, [ formState ])

    useEffect(() => {
      setFormState(initialForm);
    }, [initialForm?.id])
    


    const isFormValid = useMemo(() => {
      
      for (const formValue of Object.keys( formValidation ) ) {
        if (formValidation[formValue] !== null ) return false;
      }

      return true;

    }, [formValidation])

    const onInputChange = ({target}: {target: any}) => {
      if(!target) return;
        const { name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onReset = () => {
        setFormState(initialForm);
    }


  const createValidators = () => {
    const formCheckedValues: Record<string, string | null> = {};

    for (const formField of Object.keys(formValidations || {})) {
      const [fn, errorMessage] = formValidations![formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };




  return {
    ...formState, 
    formState, 
    onInputChange, 
    onReset,
    ...formValidation,
    isFormValid,
  }
}

export default useForm