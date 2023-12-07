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
        v-model="v$.obj.name.$model"
        maxlength="150"
        :class="{ 'p-invalid': submitted && v$.obj.name.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.obj.name.$invalid"
        >Campo inválido</small
      >
    </div>

    <template #footer>
      <Button
        label="Cancelar"
        class="p-button-text"
        icon="pi pi-times"
        @click="hideDialog"
      ></Button>
      <Button
        label="Salvar"
        icon="pi pi-check"
        @click="send(!v$.obj.$invalid)"
      ></Button>
    </template>
  </Dialog>
</template>

<script>
//Models
import Permission from "../../../models/permission";

//Services
import PermissionService from "../../../service/permission_service";

import { useVuelidate } from "@vuelidate/core";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: ["objSelected"],
  data() {
    return {
      obj: new Permission(),
      service: new PermissionService(),
      submitted: false,
    };
  },
  validations() {
    return {
      obj: new Permission().validations(),
    };
  },
  computed: {
    visible: {
      get() {
        const value = this.$store.state.permission.dialogForm;
        if (value === true) {
          this.getData();
        }
        return value;
      },
      set(value) {
        this.$store.state.permission.dialogForm = value;
      },
    },
  },
  methods: {
    getData() {
      this.obj = this.objSelected;
    },
    hideDialog() {
      this.obj = new Permission();
      this.$emit("findAll");
      this.visible = false;
    },
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
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
      } else {
        return;
      }
    },
  },
};
</script>

<style>
</style>