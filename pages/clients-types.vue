<template>
  <div>
    <DataTable
      :model="model"
      :headers="headers"
      url="/TipoCliente"
      showActions
      form-title="Cadastro de clientes"
      @items="items = $event"
      @editItem="editItem"
      @cancel="model = {}"
      ref="dataTable"
    >
      <template #form="{ model }">
        <v-row>
          <TextField v-model="model.tipo" label="Tipo" name="tipo" required />
        </v-row>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
const model = ref({});
const items = ref([]);

const headers = [
  {
    title: "Tipo Cliente",
    key: "tipo",
    icon: "mdi-cash",
  },
  {
    title: "Ações",
    key: "actions",
    sortable: false,
    width: "10%",
    align: "center",
    icon: "mdi-pencil-outline",
  },
];

const editItem = (item: any) => {
  model.value = {
    servicoId: item.servicoId,
    tipo: item.tipo,
    funcionarioId: item.funcionario.funcionarioId,
    valorPeca: item.valorPeca,
    valorTotal: item.valorTotal,
    data: item.data,
    descricao: item.descricao,
  };
};
</script>
