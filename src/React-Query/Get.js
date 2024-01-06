import { useMutation, useQuery } from "react-query";
import { axios } from "../config/axios";

export const fetchTable = () => {
  return axios.get("/resource");
};

export const useFetchTable = () => {
  return useQuery({
    queryKey: ["table"],
    queryFn: () => fetchTable(),
    select: (res) => res.data,
  });
};

export const fetchSingleData = (id) => {
  return axios.get(`/resource/${id}`);
};

export const useFetchSingleData = (id) => {
  return useQuery({
    queryKey: ["singleData"],
    queryFn: () => fetchSingleData(id),
    select: (res) => res.data,
  });
};

export const deleteSingleData = (id) => {
  return axios.delete(`/resource/${id}`);
};

export const useDeleteSingleData = (id) => {
  return useMutation(deleteSingleData);
};
