import { IFormValues } from "./authInterfaces";

export const loginConstants = {
  LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
  LOGIN_FAILURE: "USERS_LOGIN_FAILURE",
};

export const loginInitialValues: IFormValues = { email: "", password: "" };
