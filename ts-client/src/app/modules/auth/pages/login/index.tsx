import React from "react";
import { Formik, Form, FormikProps } from "formik";
import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Button,
} from "@material-ui/core";
import styles from "./index.module.scss";
import { IFormValues } from "../../authInterfaces";
import clsx from "clsx";
import { useAppDispatch } from "../../../../hooks";
import { login } from "../../authSlice";
import { loginInitialValues } from "../../loginConstants";
import { validationSchema } from "../../utils";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: IFormValues) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h1 className={styles.title}>Login to C'est Chic CMS</h1>
        <Formik
          initialValues={loginInitialValues}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<IFormValues>) => (
            <Form className={styles.loginForm}>
              <FormGroup>
                <FormControl className={clsx(styles.formControl, "mb8")}>
                  <InputLabel id="emailLabel" className={styles.formLabel}>
                    Email
                  </InputLabel>
                  <Input
                    className={styles.formInput}
                    name="email"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                  />
                  <span className={clsx(styles.error_span, "mt2")}>
                    {props.errors.email && props.touched.email
                      ? props.errors.email
                      : ""}
                  </span>
                </FormControl>
                <FormControl className={clsx(styles.formControl, "mb8")}>
                  <InputLabel id="passwordLabel" className={styles.formLabel}>
                    Password
                  </InputLabel>
                  <Input
                    className={styles.formInput}
                    name="password"
                    type="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />
                  <span className={clsx(styles.error_span, "mt2")}>
                    {props.errors.password && props.touched.password
                      ? props.errors.password
                      : ""}
                  </span>
                </FormControl>
                <Button
                  className={styles.submitBtn}
                  type="submit"
                  variant={"outlined"}
                  color={"inherit"}
                  disabled={
                    props.isSubmitting || !(props.isValid && props.dirty)
                  }
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
