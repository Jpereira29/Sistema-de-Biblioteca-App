<template>
  <v-col class="d-flex justify-center align-center mt-12">
    <v-card width="450">
      <v-card-title class="text-center font-weight-bold text-primary"
        >Login</v-card-title
      >
      <v-img src="/images/logo.svg" height="220" class="ma-2" contain></v-img>
      <v-card-text>
        <v-text-field
          v-model="data.userName"
          label="Usuário"
          type="text"
          variant="outlined"
          prepend-inner-icon="mdi-account-outline"
          density="compact"
          required
        ></v-text-field>
        <v-text-field
          v-model="data.passwordHash"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          label="Senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          width="100%"
          class="font-weight-bold"
          color="primary"
          @click="login"
          :loading="loading"
          >Login</v-btn
        >
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts" setup>
import { useAxios } from "~/services/axios";

const { $axios } = useAxios();
const router = useRouter();
const visible = ref(false);
const loading = ref(false);

const data = ref({
  userName: "",
  passwordHash: "",
});

const login = async () => {
  try {
    loading.value = true;
    const response = await $axios.post("/auth/login", data.value);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("expiration", response.data.expiration);
    router.push("/");
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: "empty",
});
</script>
