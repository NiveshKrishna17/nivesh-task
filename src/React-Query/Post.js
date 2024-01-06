import { useMutation } from "react-query";
import { axios } from "../config/axios";

export const login = (data) => {
  return axios.post("/resource", { ...data });
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: (loginSuccessData) => {},
  });
};

export const register = (data) => {
  return axios.post("/resource", { ...data });
};

export const useRegister = () => {
  return useMutation(register, {
    onSuccess: (registerSuccessData) => {},
  });
};

export const update = (data) => {
  return axios.put("/resource", { ...data });
};

export const useUpdate = () => {
  return useMutation(update, {
    onSuccess: (updateSuccessData) => {},
  });
};
