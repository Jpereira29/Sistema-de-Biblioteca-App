import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#C7DFDB",
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: "#C7DFDB",
            v_blue_900: "##2C3E50",
            v_gray_300: "#D9D9D9",
          },
        },
      },
    },
    defaults: {
      VCard: {
        elevation: 1,
      },
      VDataTable: {
        class: "elevation-4",
        density: "comfortable",
      },
      VTextField: {
        variant: "solo",
        density: "compact",
      },
      VCombobox: {
        variant: "solo",
        density: "compact",
      },
      VTextarea: {
        variant: "solo",
      },
      VNavigationDrawer: {
        elevation: "4",
      },
      VChip: {
        variant: "tonal",
      },
    },
  });
  app.vueApp.use(vuetify);
});
