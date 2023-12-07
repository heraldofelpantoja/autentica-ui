<template>
  <Dialog
    :visible="visible"
    modal
    header="Formulário de Permissão"
    :style="{ width: '50rem' }"
    class="p-fluid"
    :closable="false"
    :hideDialog="hideDialog"
  >
    <div class="field">
      <label for="nome_permissao">Nome</label>
      <InputText
        id="nome_permissao"
        placeholder="Digite o nome da Permissão"
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
//Models
import Permission from "../../../models/permission";

//Services
import PermissionService from "../../../service/permission_service";

export default {
  props: ["objSelected"],
  data() {
    return {
      obj: new Permission(),
      service: new PermissionService(),
    };
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
    hideDialog() {
      this.obj = new Permission();
      this.$emit("findAll");
      this.visible = false;
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
  },
};
</script>

<style>
</style>