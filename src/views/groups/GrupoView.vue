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

    <!--DIALOG HERALDO-->
    <Dialog
      :visible="visible"
      modal
      header="Formulário de Grupo"
      :closable="false"
      :style="{ width: '50rem' }"
      class="p-fluid"
    >
      <div class="field">
        <label for="nome_grupo">Nome </label>
        <InputText
          id="nome_grupo"
          placeholder="Digite o nome do Grupo"
          required
          v-model="obj.name"
        />
      </div>

      <template #footer>
        <Button
          label="Cancelar"
          class="p-button-text"
          icon="pi pi-times"
          @click="hideDialog"
        ></Button>

        <Button label="Salvar" icon="pi pi-check" @click="send"></Button>
      </template>
    </Dialog>
  </div>
</template>

<script>
//Service
import GrupoService from "../../service/grupo_service";

//Models
import Grupo from "../../models/grupo";
import RoutesName from "@/router/routes_name";

export default {
  data() {
    return {
      obj: new Grupo(),
      list: [],
      service: new GrupoService(),
      visible: false,
      RoutesName,
    };
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