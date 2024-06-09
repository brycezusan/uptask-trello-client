import { isAxiosError } from "axios";
import api from "../lib";
import {
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordFields,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
} from "../types";

export const createAccount = async ({
  formData,
}: {
  formData: UserRegistrationForm;
}) => {
  try {
    const { data } = await api.post<string>(`/auth/create-account`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.msg);
    }
  }
};

export const confirmTokenAccount = async (token: ConfirmToken["token"]) => {
  try {
    const { data } = await api.post<string>(`/auth/confirm-account`, { token });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response?.data);
    }
  }
};

export const requestNewtoken = async (
  formData: RequestConfirmationCodeForm
) => {
  try {
    const { data } = await api.post<string>(`/auth/request-token`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response?.data.msg);
    }
  }
};

export const authLogin = async (formData: UserLoginForm) => {
  try {
    const { data } = await api.post<string>(`/auth/login`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response?.data);
    }
  }
};

export const forgatPassword = async (formData: ForgotPasswordForm) => {
  try {
    const { data } = await api.post<string>(`/auth/forgat-password`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data);
    }
  }
};

export const validateToken = async (token: string) => {
  try {
    const { data } = await api.post<string>(`/auth/validate-token`, { token });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response?.data);
    }
  }
};

export const updatePasswordToken = async ({
  token,
  formData,
}: {
  token: string;
  formData: NewPasswordFields;
}) => {
  try {
    const { data } = await api.post(
      `/auth/update-password/${token}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};
