import moment from "moment";
import { useRouter } from 'vue-router';

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const expirationDate = localStorage.getItem("expiration");
    const currentDate = moment();

    if (!expirationDate || moment(expirationDate).isBefore(currentDate)) {
      if (to.path !== "/login") {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");

        const router = useRouter();
        router.push('/login');
      }
    }
  }
});