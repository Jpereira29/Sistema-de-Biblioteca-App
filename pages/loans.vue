<template>
  <div>
    <DataTable
      :model="model"
      :headers="headers"
      url="/Emprestimo"
      showActions
      form-title="Empréstimo"
      @items="items = $event"
      @editItem="editItem"
      @cancel="model = {}"
      ref="dataTable"
    >
      <template #form="{ model }">
        <v-row>
          <Combobox
            v-model="model.livroId"
            url="/Livro"
            item-title="titulo"
            item-value="id"
            label="Livro"
            name="livro"
            required
          />
          <Combobox
            v-model="model.clienteId"
            url="/Cliente"
            item-title="nome"
            item-value="id"
            label="Cliente"
            name="cliente"
            required
          />
          <TextField
            v-model="model.dataEmprestimo"
            label="Data Emprestimo"
            name="dataEmprestimo"
            required
            type="datetime-local"
          />
          <TextField
            v-model="model.previsaoEntrega"
            label="Previsao Entrega"
            name="previsaoEntrega"
            required
            type="datetime-local"
          />
        </v-row>
      </template>

      <template #item.livro="{ item }">
        {{ item.livro.titulo }}
      </template>

      <template #item.cliente="{ item }">
        {{ item.cliente.nome }}
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
const model = ref({});
const items = ref([]);

const headers = [
  {
    title: "Livro",
    key: "livro",
    icon: "mdi-cash",
  },
  {
    title: "Data de empréstimo",
    key: "dataEmprestimo",
  },
  {
    title: "Previsão de entrega",
    key: "previsaoEntrega",
    icon: "mdi-cash",
  },
  {
    title: "Cliente",
    key: "cliente",
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
