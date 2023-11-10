<template>
  <div>
    <Toolbar>
      <template #start>
        <Button icon="pi pi-bars" class="mr-4" @click="changeVisible" />
        <h1>Agenda</h1>
      </template>
    </Toolbar>
    <app-menu />
    <br /><br />
    <router-view />
    <ConfirmDialog></ConfirmDialog>
    <Toast></Toast>
  </div>
</template>
<script>
import AppMenu from "./components/AppMenu.vue";
export default {
  components: {
    AppMenu,
  },
  data() {
    return {};
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.visibleSideBar;
      },
      set(value) {
        this.$store.state.visibleSideBar = value;
      },
    },
  },
  methods: {
    changeVisible() {
      this.visible = true;
    },
  },
};
</script>
<style></style>