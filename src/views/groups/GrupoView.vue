<template>
  <div>
    <Fieldset legend="Gerenciamento de Grupo">
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

    <!--DIALOG-->
    <DialogForm :objSelected="obj" @findAll="findAll"></DialogForm>
  </div>
</template>

<script>
//Service
import GrupoService from "../../service/grupo_service";

//Models
import Grupo from "../../models/grupo";
import RoutesName from "@/router/routes_name";

//Components
import DialogForm from "./components/DialogForm.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      obj: new Grupo(),
      list: [],
      service: new GrupoService(),
      RoutesName,
    };
  },
  computed: {
    visible: {
      get() {
        const value = this.$store.state.grupo.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.grupo.dialogForm = value;
      },
    },
  },
  mounted() {
    this.findAll();
  },
  methods: {
    send() {
      if (this.obj.id == null) {
        this.service.create(this.obj).then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Alerta de Sucesso.",
            detail: "Criado com sucesso.",
            life: 3000,
          });
          this.hideDialog();
        });
      } else {
        this.service.update(this.obj).then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Alerta de Sucesso.",
            detail: "Atualizado com sucesso.",
            life: 3000,
          });
          this.hideDialog();
        });
      }
    },

    hideDialog() {
      this.obj = new Grupo();
      this.visible = false;
      this.findAll();
    },
    findAll() {
      this.service.findAll().then((data) => {
        this.list = data;
      });
    },
    goNew() {
      this.obj = new Grupo();
      this.visible = true;
      //sessionStorage.setItem("grupo", JSON.stringify(this.obj));
      //this.$router.push(RoutesName.GROUP_FORM_ROUTE);
    },
    showUpdate(data) {
      this.obj = data;
      this.visible = true;
      //sessionStorage.setItem("grupo", JSON.stringify(this.obj));
      //this.$router.push(RoutesName.GROUP_FORM_ROUTE);
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