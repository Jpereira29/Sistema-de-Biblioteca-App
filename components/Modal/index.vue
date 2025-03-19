<template>
  <v-dialog max-width="600px" align="center">
    <v-card>
      <v-card-title>
        <span>{{ title }}</span>
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" @click="emit('close')"> Cancelar </v-btn>
        <v-btn color="blue darken-1" @click="emit('confirmed')">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirmed", "close"]);
</script>
