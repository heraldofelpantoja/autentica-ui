<template>
  <div>
    <Fieldset legend="Gerenciamento de Usuário">
      <Toolbar>
        <template #start> <Button @click="goNew">Novo</Button> </template>
      </Toolbar>
      <DataTable :value="list">
        <Column field="id" header="#"></Column>
        <Column field="name" header="Nome"></Column>
        <Column field="email" header="E-mail"></Column>
        <Column field="contact" header="Contato"></Column>
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
  </div>

  <!--DIALOG HERALDO-->

  <Dialog
    v-model:visible="visible"
    :modal="true"
    header="Formulário de Usuários"
    :style="{ width: '50rem' }"
    class="p-fluid"
    @hide="hideDialog"
  >
    <div class="field">
      <label for="nome_usuario">Nome </label>
      <InputText
        id="nome_usuario"
        placeholder="Digite o nome do Usuário"
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
</template>
  

<script>
//Service
import UserService from "../../service/user_service";

//Models
import User from "../../models/user";
import RoutesName from "@/router/routes_name";

export default {
  data() {
    return {
      obj: new User(),
      list: [],
      service: new UserService(),
      visible: false,
      RoutesName,
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      this.service.findAll().then((data) => {
        this.list = data;
      });
    },

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

    goNew() {
      this.obj = new User();
      this.visible = true;
      /*
      sessionStorage.setItem("user", JSON.stringify(this.obj));
      this.$router.push(RoutesName.USER_FORM_ROUTE);
      */
    },
    showUpdate(data) {
      this.obj = data;
      this.visible = true;
      /*
      sessionStorage.setItem("user", JSON.stringify(this.obj));
      this.$router.push(RoutesName.USER_FORM_ROUTE);
      */
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
    hideDialog() {
      this.obj = new User();
      this.visible = false;
      this.findAll();
    },
  },
};
</script>
  
<style></style>