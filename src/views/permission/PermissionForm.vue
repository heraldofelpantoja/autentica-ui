<template>
  <Fieldset legend="Formulário de Permissão">
    <form class="grid p-fluid" @submit.prevent="send">
      <div class="field col-12">
        <label for="nome_permissao">Nome Permissão: </label>
        <InputText
          id="nome_permissao"
          placeholder="Digite o nome da Permissão"
          required
          v-model="obj.name"
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
import Permission from "../../models/permission";

//Services
import PermissionService from "@/service/permission_service";
import RoutesName from "@/router/routes_name";

export default {
  data() {
    return {
      obj: new Permission(),
      service: new PermissionService(),
    };
  },
  mounted() {
    const json = sessionStorage.getItem("permission");
    this.obj = JSON.parse(json);
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
      this.$router.push(RoutesName.PERMISSION_ROUTE);
    },
  },
};
</script>

<style></style>