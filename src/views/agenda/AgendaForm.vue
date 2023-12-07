<template>
  <Fieldset legend="Agenda">
    <form class="grid p-fluid" @submit.prevent="send">
      <div class="field col-6">
        <label for="nomegrupo">Agenda:</label>
        <InputText
          id="nomegrupo"
          placeholder="Digite o nome do contato"
          required
          v-model="obj.name"
        />
      </div>

      <div class="field col-6">
        <label>Contato</label>
        <InputText
          placeholder="Selecione o contato"
          required
          v-model="obj.contact"
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
    <br />
    <Fieldset legend="Ligações">
      <OrderList v-model="obj.call">
        <template #item="slotProps">
          <div class="flex flex-wrap p-2 align-items-center gap-3">
            <div class="flex-1 flex flex-column gap-2">
              <span class="font-bold">{{
                Moment(slotProps.item).format("DD/MM/YYYY HH:mm:ss")
              }}</span>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-phone text-sm"></i>
                <span>Ligação</span>
              </div>
            </div>
          </div>
        </template>
      </OrderList>
    </Fieldset>
  </Fieldset>
</template>
  
  <script>
//Models
import Agenda from "../../models/agenda";

//Services
import AgendaService from "@/service/agenda_service";

//Libs
import Moment from "moment";

export default {
  data() {
    return {
      obj: new Agenda(),
      service: new AgendaService(),
      permissionService: new AgendaService(),
      permissions: [],
      Moment,
    };
  },
  mounted() {
    const json = sessionStorage.getItem("agenda");
    this.obj = JSON.parse(json);
    this.getPermission();
  },
  methods: {
    getPermission() {
      this.permissionService.findAll().then((data) => {
        this.permissions = data;
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
      this.$router.push("/");
    },
  },
};
</script>
  
  <style></style>
  