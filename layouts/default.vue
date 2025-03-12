<template>
  <v-app>
    <Header />
    <v-main>
      <NavigationDrawer />
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>