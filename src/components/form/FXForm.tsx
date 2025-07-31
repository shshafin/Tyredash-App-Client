"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
}

const FXForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const formConfig: formConfig = {};
  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const submitHandler = methods.handleSubmit;
  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FXForm;
