<template>
  <Fieldset legend="Gerenciamento de Grupos">
    <form class="grid p-fluid" @submit.prevent="send">
      <div class="field col-6">
        <label for="nomegrupo">Nome do Grupo: </label>
        <InputText
          id="nomegrupo"
          placeholder="Digite o nome do grupo"
          required
          v-model="obj.name"
        />
      </div>
      <div class="field col-6">
        <label >Permissões</label>
        <MultiSelect
          :options="permissions"
          optionLabel="name"
          placeholder="Selecione as permissões"
          filter="true"
          showClear="true"
          v-model="obj.permissions"
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
import Grupo from "../../models/grupo";

//Services
import GrupoService from "@/service/grupo_service";
import PermissionService from '@/service/permission_service';

export default {
  data() {
    return {
      obj: new Grupo(),
      service: new GrupoService(),
      permissionService: new PermissionService(),
      permissions: [],
    };
  },
  mounted() {
    const json = sessionStorage.getItem("grupo");
    this.obj = JSON.parse(json);
    this.getPermission();
  },
  methods: {
    getPermission() {
      this.permissionService.findAll().then((data) => {
        this.permissions = data;
      })
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
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
