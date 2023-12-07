<template>
  <div>
    <Fieldset legend="Gerenciamento de Agenda">
      <Toolbar>
        <template #start> <Button @click="goNew">Novo</Button> </template>
      </Toolbar>
      <DataTable :value="list">
        <Column field="id" header="#"></Column>
        <Column field="name" header="Nome"></Column>
        <Column field="contact" header="Contato"></Column>

        <Column header="Ações">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="showUpdate(slotProps.data)"
            />
            <Button
              icon="pi pi-phone"
              class="p-button-rounded mr-2"
              @click="call(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="showRemove(slotProps.data)"
            /> </template
        ></Column>
      </DataTable>
    </Fieldset>

    <!-- DialogForm -->
    <DialogForm :obj-selected="obj" @findAll="findAll"></DialogForm>
  </div>
</template>

<script>
//Service
import AgendaService from "../../service/agenda_service";

//Models
import Agenda from "../../models/agenda";

//Components
import DialogForm from "./components/DialogForm.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      obj: new Agenda(),
      list: [],
      service: new AgendaService(),
    };
  },
  mounted() {
    this.findAll();
  },
  computed: {
    visible: {
      get() {
        const value = this.$store.state.agenda.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.agenda.dialogForm = value;
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
      this.obj = new Agenda();
      this.visible = true;
    },
    showUpdate(data) {
      this.obj = data;
      this.visible = true;
    },
    call(data) {
      this.obj = data;
      this.$confirm.require({
        header: `Ligando...`,
        message: `Ligando para o contato ${this.obj.name}`,
        acceptLabel: "Desligar",
        rejectLabel: "",
        accept: () => {
          this.obj.call.push(new Date());
          this.service.update(this.obj).then(() => {
            this.$toast.add({
              severity: "success",
              summary: "Alerta de Sucesso.",
              detail: "Ligação efetuada com sucesso.",
              life: 3000,
            });
            this.findAll();
          });
        },
      });
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









