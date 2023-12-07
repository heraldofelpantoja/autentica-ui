<template>
  <Fieldset legend="Formulário de Usuários">
    <form class="grid p-fluid" @submit.prevent="send">
      <div class="field col-6">
        <label for="nomegrupo">Nome do Usuario:</label>
        <InputText
          id="nome_usuario"
          placeholder="Digite o nome do usuário"
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
          v-model="obj.email"
        />
      </div>

      <div class="field col-6">
        <label for="nome_password">Senha:</label>
        <InputText
          id="senha"
          placeholder="Digite sua senha"
          required
          v-model="obj.password"
        />
      </div>

      <div class="field col-6">
        <label for="confirmar_password">Confirmar Senha:</label>
        <InputText
          id="confirmar_senha"
          placeholder="Confirmar senha"
          required
          v-model="obj.password"
        />
      </div>

      <div class="field col-6">
        <label for="contato">Contato:</label>
        <InputText
          id="nome_contato"
          placeholder="Digite um contato"
          required
          v-model="obj.contact"
        />
      </div>

      <div class="field col-6">
        <label>Grupo</label>
        <Dropdown
          v-model="obj.group.id"
          :options="groups"
          optionLabel="name"
          placeholder="Selecione"
        />
      </div>

      <div class="field col-12">
        <hr />
      </div>
      <div class="field col-2">
        <Button
          label="Voltar"
          class="p-button-secondary"
          @click="back"
        ></Button>
      </div>
      <div class="field col-2">
        <Button label="Enviar" type="submit"></Button>
      </div>
    </form>
  </Fieldset>
</template>
  
  <script>
//Models
import User from "../../models/user";

//Services
import UserService from "../../service/user_service";
import GroupService from "../../service/grupo_service";
import RoutesName from "@/router/routes_name";

export default {
  data() {
    return {
      obj: new User(),
      service: new UserService(),
      grupoService: new GroupService(),
      groups: [],
    };
  },
  mounted() {
    const json = sessionStorage.getItem("user");
    this.obj = JSON.parse(json);
    this.getGroups();
  },

  methods: {
    getGroups() {
      this.grupoService.findAll().then((data) => {
        this.groups = data;
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
          this.back();
        });
      } else {
        this.service.update(this.obj).then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Alerta de Sucesso.",
            detail: "Atualizado com sucesso.",
            life: 3000,
          });
          this.back();
        });
      }
    },
    back() {
      this.$router.push(RoutesName.USER_ROUTE);
    },
  },
};
</script>
  
<style></style>