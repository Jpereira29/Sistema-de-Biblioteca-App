<template>
  <v-col>
    <v-text-field
      :model-value="modelValue"
      :prefix="prefix"
      @update:modelValue="$emit('update:modelValue', $event)"
      :label="label"
      :type="type"
      variant="solo"
      :name="name"
    />
  </v-col>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
  prefix: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});
</script>