<template>
  <v-col>
    <v-data-table
      v-if="!mobile"
      :headers="props.headers"
      :items="items"
      :items-length="items.length"
      :loading="loading"
      loading-text="Carregando..."
      no-data-text="Nenhum registro encontrado."
      items-per-page-text="Itens por página:"
    >
      <template v-for="(_, value) in $slots" #[value]="slot">
        <slot :name="value" v-bind="slot" />
      </template>

      <template v-if="props.showActions" #item.actions="{ item }">
        <v-btn
          color="green_600"
          density="comfortable"
          icon="mdi-pencil"
          class="mr-1"
          @click="editItem(item)"
        />
        <v-btn
          color="error"
          density="comfortable"
          icon="mdi-delete"
          class="ml-1"
          @click="handleDeleteItem(item)"
        />
      </template>

      <template #footer.prepend>
        <div v-if="showForm" class="mr-auto ml-4">
          <v-btn
            density="comfortable"
            color="green_600"
            text="Adicionar"
            class="text-capitalize font-weight-bold mr-4"
            @click="addItem"
          />
          <slot name="footer" />
        </div>
      </template>
    </v-data-table>

    <div v-else>
      <v-skeleton-loader
        v-for="_ in 3"
        v-if="loading"
        type="card"
        elevation="1"
        class="ma-6"
      />
      <CardInfo v-for="item in itemsPaginated" :headers="headers" :item="item">
        <template v-if="props.showActions" #item.actions>
          <v-btn
            color="green_600"
            density="comfortable"
            icon="mdi-pencil"
            class="mr-1"
            @click="editItem(item)"
          />
          <v-btn
            color="error"
            density="comfortable"
            icon="mdi-delete"
            class="ml-1"
            @click="handleDeleteItem(item)"
          />
        </template>

        <template v-for="(_, value) in $slots" #[value]="slot">
          <slot :name="value" v-bind="slot" />
        </template>
      </CardInfo>

      <v-pagination
        v-if="pagination.length > 1"
        v-model="page"
        :length="pagination.length"
        rounded="circle"
        class="mt-2 mb-6"
      />

      <v-col v-if="items.length == 0 && !loading" class="text-center"
        >Nenhum registro encontrado.</v-col
      >

      <v-col v-if="!loading && showForm">
        <div>
          <v-btn
            color="green_600"
            class="text-capitalize font-weight-bold mr-4"
            @click="addItem"
            icon="mdi-plus"
          />
          <slot name="footer" />
        </div>
      </v-col>
    </div>

    <v-dialog
      v-if="showForm"
      v-model="dialog"
      persistent
      width="80%"
      scrollable
    >
      <v-card>
        <v-card-title class="bg-green_600 text-center font-weight-bold">{{
          props.formTitle
        }}</v-card-title>
        <v-card-text>
          <slot name="form" :model="model" />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="elevated" color="error" @click="cancel"
            >Cancelar</v-btn
          >
          <v-btn
            variant="elevated"
            color="green_600"
            :loading="loadingSaveBtn"
            @click="handleItems"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Modal
      v-model="dialogModal"
      title="Aviso!"
      text="Tem certeza que deseja excluir esse item?"
      @confirmed="deleteItem"
      @close="dialogModal = false"
      scrollable
    />
  </v-col>
</template>

<script lang="ts" setup>
import { useAxios } from "~/services/axios";
import { useDisplay } from "vuetify";

const { $axios } = useAxios();
const { mobile } = useDisplay();

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array<any>,
    default: () => [],
  },
  showActions: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: "",
  },
  formTitle: {
    type: String,
    default: "",
  },
  filterQuery: {
    type: Object,
    default: () => ({}),
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  showForm: {
    type: Boolean,
    default: true,
  },
});

const items = ref(props.items);
const loading = ref(true);
const loadingSaveBtn = ref(false);
const dialog = ref(false);
const editedItem = ref(false);
const dialogModal = ref(false);
const deleteModel = ref({});
const model = ref({});
const page = ref(1);

const pagination = computed(() => {
  return {
    itemsPerPage: 5,
    totalItems: items.value.length,
    pageCount: 0,
    length: Math.ceil(items.value.length / 5),
  };
});

const itemsPaginated = computed(() => {
  const start = (page.value - 1) * pagination.value.itemsPerPage;
  const end = page.value * pagination.value.itemsPerPage;
  return items.value.slice(start, end);
});

const getItems = async () => {
  let url = props.url;
  const { data } = await $axios.get(url, { params: props.params });
  emit("items", data);
  emit("cancel");
  items.value = data;
};

const handleItems = async () => {
  if (editedItem.value) {
    await updateItem();
  } else {
    await saveItem();
  }
};

const addItem = () => {
  dialog.value = true;
  editedItem.value = false;
  model.value = {};
};

const saveItem = async () => {
  try {
    await $axios.post(props.url, model.value).then(async (response) => {
      if (response.status === 200) {
        dialog.value = false;
        await getItems();
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    loadingSaveBtn.value = false;
  }
};

const updateItem = async () => {
  try {
    await $axios
      .put(`${props.url}/${model.value.id}`, model.value)
      .then(async (response) => {
        if (response.status === 200) {
          dialog.value = false;
          editedItem.value = false;
          await getItems();
        }
      });
  } catch (error) {
    console.error(error);
  } finally {
    loadingSaveBtn.value = false;
  }
};

const handleDeleteItem = (item: any) => {
  dialogModal.value = true;
  deleteModel.value = item;
};

const deleteItem = async () => {
  try {
    await $axios
      .delete(`${props.url}/${deleteModel.value.id}`)
      .then(async (response) => {
        if (response.status === 200) {
          dialogModal.value = false;
          await getItems();
        }
      });
  } catch (error) {
    console.error(error);
  }
};

const editItem = (item: any) => {
  dialog.value = true;
  editedItem.value = true;
  model.value = { ...item };
};
const cancel = () => {
  dialog.value = false;
  editedItem.value = false;
};

const takeHeaderValue = (item: any) => {
  return `item.${item.key}`;
};

onMounted(async () => {
  if (props.items.length === 0) {
    try {
      loading.value = true;
      await getItems();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
});

const emit = defineEmits(["items", "editItem", "cancel"]);
defineExpose({ getItems });
</script>
