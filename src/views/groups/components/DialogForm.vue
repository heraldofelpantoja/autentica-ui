<template>
  <Dialog
    v-model:visible="visible"
    :modal="true"
    header="Formulário de Grupo"
    :style="{ width: '50rem' }"
    class="p-fluid"
    :closable="false"
    @hide="hideDialog"
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

    <div class="field">
      <label>Permissões</label>
      <MultiSelect
        v-model="obj.permissions"
        :options="permissions"
        optionLabel="name"
        :filter="true"
        :showClear="true"
        placeholder="Selecione as permissões"
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
import Grupo from "../../../models/grupo";

//Services
import GroupService from "../../../service/grupo_service";
import PermissionService from "../../../service/permission_service";

export default {
  props: ["objSelected"],
  data() {
    return {
      obj: new Grupo(),
      service: new GroupService(),
      permissionService: new PermissionService(),
      permissions: [],
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
    this.findPermissions();
  },
  methods: {
    findPermissions() {
      this.permissionService.findAll().then((data) => {
        this.permissions = data;
      });
    },
    hideDialog() {
      this.obj = new Grupo();
      this.$emit("findAll");
      this.visible = false;
    },
    getData() {
      this.obj = this.objSelected;
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