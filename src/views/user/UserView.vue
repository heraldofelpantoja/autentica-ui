<template>
  <div>
    <Fieldset legend="Gerenciamento de Usuário">
      <Toolbar>
        <template #start> <Button @click="goNew">Novo</Button> </template>
      </Toolbar>
      <DataTable :value="list">
        <Column field="id" header="id"></Column>
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
    goNew() {
      this.obj = new User();
      sessionStorage.setItem("user", JSON.stringify(this.obj));
      this.$router.push(RoutesName.USER_FORM_ROUTE);
    },
    showUpdate(data) {
      this.obj = data;
      sessionStorage.setItem("user", JSON.stringify(this.obj));
      this.$router.push(RoutesName.USER_FORM_ROUTE);
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