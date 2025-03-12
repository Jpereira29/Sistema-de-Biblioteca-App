<template>
  <v-app-bar app color="primary" dark density="compact" elevation="1">
    <v-toolbar-title>Sistema de Biblioteca</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value?.dark ? "light" : "dark";

  localStorage.setItem("theme", theme.global.name.value);
};

onMounted(() => {
  theme.global.name.value = localStorage.getItem("theme") || "light";
});
</script>
