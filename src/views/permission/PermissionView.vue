<template>
  <div>
    <Fieldset legend="Gerenciamento de Permissões">
      <Toolbar>
        <template #start> <Button @click="goNew">Novo</Button> </template>
      </Toolbar>
      <DataTable :value="list">
        <Column field="id" header="#"></Column>
        <Column field="name" header="Nome"></Column>
        <Column header="Ações">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="showUpdate(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="showRemove(slotProps.data)"
            /> </template
        ></Column>
      </DataTable>
    </Fieldset>

    <!-- DIALOG-->
    <DialogForm :objSelected="obj" @findAll="findAll"></DialogForm>
  </div>
</template>

<script>
//Service
import PermissionService from "../../service/permission_service";

//Models
import Permission from "../../models/permission";
import RoutesName from "@/router/routes_name";

//Components
import DialogForm from "./components/DialogForm.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      obj: new Permission(),
      list: [],
      service: new PermissionService(),
      RoutesName,
    };
  },
  mounted() {
    this.findAll();
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.permission.dialogForm;
      },
      set(value) {
        this.$store.state.permission.dialogForm = value;
      },
    },
  },
  methods: {
    findAll() {
      this.service.findAll().then((data) => {
        this.list = data;
      });
    },
    goNew() {
      this.obj = new Permission();
      this.visible = true;
    },
    showUpdate(data) {
      this.obj = data;
      this.visible = true;
    },
    showRemove(data) {
      this.obj = data;
      this.$confirm.require({
        header: "Deseja excluir?",
        message: "Tem certeza que deseja excluir este registro?",
        acceptLabel: "Confirmar",
        rejectLabel: "Cancelar",
        accept: () => {
          this.service
            .delete(this.obj.id)
            .then(() => {
              this.$toast.add({
                severity: "success",
                summary: "Alerta de Sucesso.",
                detail: "Deletado com sucesso.",
                life: 3000,
              });
              this.findAll();
            })
            .catch((err) => {
              console.error(err);
            });
        },
      });
    },
  },
};
</script>

<style></style>