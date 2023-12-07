<template>
  <Dialog
    v-model:visible="visible"
    :modal="true"
    header="Formulário de Usuários"
    :style="{ width: '50rem' }"
    class="p-fluid"
    :closable="false"
    @hide="hideDialog"
  >
    <div class="grid">
      <div class="field col-6">
        <label for="nome_usuario">Nome </label>
        <InputText
          id="nome_usuario"
          placeholder="Digite o nome do Usuário"
          required
          v-model="obj.name"
        />
      </div>

      <div class="field col-6">
        <label for="nome_email">E-mail: </label>
        <InputText
          id="email"
          placeholder="Digite o seu email"
          required
          type="email"
          v-model="obj.email"
        />
      </div>

      <div class="field col-6">
        <label for="nome_password">Senha:</label>
        <InputText
          id="senha"
          placeholder="Digite sua senha"
          required
          type="password"
          v-model="obj.password"
        />
      </div>

      <div class="field col-6">
        <label for="confirmar_password">Confirmar Senha:</label>
        <InputText
          id="confirmar_senha"
          placeholder="Confirmar senha"
          required
          type="password"
          v-model="obj.password"
        />
      </div>

      <div class="field col-6">
        <label for="contato">Contato:</label>
        <InputMask
          mask="(99) 99999-9999"
          id="nome_contato"
          placeholder="Digite um contato"
          required
          v-model="obj.contact"
        />
      </div>

      <div class="field col-6">
        <label>Grupo</label>
        <Dropdown
          v-model="obj.group"
          :options="groups"
          optionLabel="name"
          :filter="true"
          :showClear="true"
          placeholder="Selecione o grupo"
        />
      </div>
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
import User from "../../../models/user";

//Services
import UserService from "../../../service/user_service";
import GroupService from "../../../service/grupo_service";

export default {
  props: ["objSelected"],
  data() {
    return {
      obj: new User(),
      service: new UserService(),
      groupService: new GroupService(),
      groups: [],
    };
  },
  computed: {
    visible: {
      get() {
        const value = this.$store.state.user.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.user.dialogForm = value;
      },
    },
  },
  mounted() {
    this.findGroups();
  },
  methods: {
    findGroups() {
      this.groupService.findAll().then((data) => {
        this.groups = data;
      });
    },
    hideDialog() {
      this.obj = new User();
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