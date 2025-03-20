<template>
  <div>
    <DataTable
      :model="model"
      :headers="headers"
      url="/Livro"
      showActions
      form-title="Cadastro de livro"
      @items="items = $event"
      @editItem="editItem"
      @cancel="model = {}"
      ref="dataTable"
    >
      <template #form="{ model }">
        <v-row>
          <TextField
            v-model="model.titulo"
            label="Nome"
            name="titulo"
            required
          />
          <TextField
            v-model="model.categoria"
            label="Categoria"
            name="categoria"
            required
          />
          <TextField
            v-model="model.anoPublicacao"
            label="Ano Publicação"
            name="anoPublicacao"
            required
          />
          <ComboboxMultiple
            v-model="model.autores"
            url="/Autor"
            item-title="nome"
            item-value="id"
            label="Autores"
            name="Autores"
            required
            multiple
          />
        </v-row>
      </template>

      <template #item.autores="{ item }">
        <v-chip v-for="autor in item.autores" class="mr-1">{{ autor.nome }}</v-chip>
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
    key: "titulo",
    icon: "mdi-cash",
  },
  {
    title: "Categoria",
    key: "categoria",
    icon: "mdi-cash",
  },
  {
    title: "Ano Publicação",
    key: "anoPublicacao",
    icon: "mdi-cash",
  },
  {
    title: "Autores",
    key: "autores",
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
