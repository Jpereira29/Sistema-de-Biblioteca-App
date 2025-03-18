<template>
  <v-navigation-drawer expand-on-hover rail elevation="1" permanent color="primary">
    <v-list density="compact">
      <v-list-item
        v-for="(item, i) of items"
        :prepend-icon="item.icon"
        :value="i"
        :to="item.page"
      >
        <v-list-item-title class="text-caption font-weight-bold ml-0">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const items = ref([
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    page: "/",
  },
  {
    icon: "mdi-book",
    title: "Empréstimos",
    page: "loans",
  },
  {
    icon: "mdi-account",
    title: "Usuários",
    page: "users",
  },
  {
    icon: "mdi-account-group",
    title: "Usuários Tipo",
    page: "user-types",
  },
  {
    icon: "mdi-bookshelf",
    title: "Livros",
    page: "books",
  },
  {
    icon: "mdi-bookshelf",
    title: "Autores",
    page: "authors",
  }
]);
</script>
