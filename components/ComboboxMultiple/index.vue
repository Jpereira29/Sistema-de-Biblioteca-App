<template>
  <v-col>
    <v-combobox
      v-model="selectedItems"
      @update:modelValue="$emit('update:modelValue', selectedItems)"
      :label="label"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      :loading="loading"
      variant="solo"
      :multiple="multiple"
    ></v-combobox>
  </v-col>
</template>

<script lang="ts" setup>
import { useAxios } from "~/services/axios";

const { $axios } = useAxios();

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  items: {
    type: Array<any>,
    default: () => [],
  },
  url: {
    type: String,
    default: "",
  },
  itemTitle: {
    type: String,
    default: "",
  },
  itemValue: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  keys: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const loading = ref(false);

const items = ref(props.items);

const selectedItems = ref([]);

onMounted(async () => {
  if (items.value.length == 0) {
    await getItems();
  }
});

const getItems = async () => {
  loading.value = true;
  try {
    await $axios.get(props.url).then((response) => {
      items.value = response.data;
    });
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
};
</script>
