<template>
  <div>
    <DataTable
      :model="model"
      :headers="headers"
      url="/TipoUsuario"
      showActions
      form-title="Cadastro de usuários"
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
            v-model="model.tipoUsuarioId"
            url="/TipoUsuario"
            item-title="tipo"
            item-value="id"
            label="TipoUsuario"
            name="tipoUsuario"
            required
          />
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
    title: "TipoUsuario",
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
