<template>
  <div>
    <DataTable
      :model="model"
      :headers="headers"
      url="/Cliente"
      showActions
      form-title="Cadastro de clientes"
      @items="items = $event"
      @editItem="editItem"
      @cancel="model = {}"
      ref="dataTable"
    >
      <template #form="{ model }">
        <v-row>
          <TextField v-model="model.nome" label="Nome" name="nome" required />
          <TextField
            v-model="model.telefone1"
            label="Telefone1"
            name="telefone1"
            required
          />
          <TextField
            v-model="model.telefone2"
            label="Telefone2"
            name="telefone2"
            required
          />
          <TextField
            v-model="model.email"
            label="Email"
            name="email"
            required
          />
          <Combobox
            v-model="model.tipoClienteId"
            url="/TipoCliente"
            item-title="tipo"
            item-value="id"
            label="Tipo cliente"
            name="tipoCliente"
            required
          />
        </v-row>
      </template>

      <template #item.tipoCliente="{ item }">
        <v-chip>{{ item.tipoCliente.tipo }}</v-chip>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>

const model = ref({});
const items = ref([]);

const headers = [
  {
    title: "Nome",
    key: "nome",
    icon: "mdi-cash",
  },
  {
    title: "Telefone1",
    key: "telefone1",
    icon: "mdi-cash",
  },
  {
    title: "Telefone2",
    key: "telefone2",
    icon: "mdi-cash",
  },
  {
    title: "Email",
    key: "email",
    icon: "mdi-cash",
  },
  {
    title: "Tipo cliente",
    key: "tipoCliente",
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
