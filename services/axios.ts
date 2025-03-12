import axios from "axios";
import { toast } from 'vue3-toastify';

export const useAxios = () => {
  const $axios = axios.create({
    baseURL: "https://localhost:7090/api"
  });

  $axios.interceptors.request.use(
    function (config) {
      config.headers["Authorization"] = `Bearer ${localStorage.token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    function (response) {
      switch (response.config.method) {
        case "post":
          toast.success("Salvo com sucesso!");
          break;
        case "put":
          toast.success("Atualizado com sucesso!");
          break;
        case "delete":
          toast.success("Excluído com sucesso!");
          break;
      }
      return response;
    },
    function (error) {
      switch (error?.response?.status) {
        case 400:
          toast.error("Dados inválidos!");
          break;
        case 401:
          toast.error("Sessão expirada!");
          localStorage.removeItem("token");
          navigateTo("/login")
          break;
        case 404:
          toast.error("Recurso não encontrado!");
          break;
        case 500:
          toast.error("Erro interno no servidor!");
          break;
      }
      return Promise.reject(error);
    }
  );

  return { $axios };
};