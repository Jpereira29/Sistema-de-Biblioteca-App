<template>
  <v-col>
    <v-card>
      <v-card-text>
        <v-row v-for="header in headers">
          <v-col class="font-weight-bold"
            ><v-icon class="mr-2">{{ header.icon }}</v-icon
            >{{ header.title }}:</v-col
          >
          <v-col>
            <slot :name="`item.${header.key}`" v-bind="{ item }">
            </slot>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts" setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});
</script>
