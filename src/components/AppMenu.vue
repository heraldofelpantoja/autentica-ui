<template>
  <Sidebar v-model:visible="visible">
    <template #container="{ closeCallback }">
      <div class="flex flex-column h-full">
        <div
          class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0"
        >
          <span class="inline-flex align-items-center gap-2">
            <svg
              width="35"
              height="40"
              viewBox="0 0 35 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="..." fill="var(--primary-color-color)" />
              <path d="..." fill="var(--text-color)" />
            </svg>
            <span class="font-semibold text-2xl text-primary">Agenda</span>
          </span>
          <span>
            <Button
              type="button"
              @click="closeCallback"
              icon="pi pi-times"
              rounded
              outlined
              class="h-2rem w-2rem"
            ></Button>
          </span>
        </div>
        <hr />
        <ul class="list-none p-0 m-0 overflow-hidden">
          <li>
            <a
              :href="RoutesName.HOME_ROUTE"
              v-ripple
              class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-phone mr-2"></i>
              <span class="font-medium">Agenda</span>
            </a>
          </li>
          <li>
            <a
              :href="RoutesName.USER_ROUTE"
              v-ripple
              class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-user mr-2"></i>
              <span class="font-medium">Usuários</span>
            </a>
          </li>
          <li>
            <a
              :href="RoutesName.GROUP_ROUTE"
              v-ripple
              class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-users mr-2"></i>
              <span class="font-medium">Grupos</span>
            </a>
          </li>
          <li>
            <a
              :href="RoutesName.PERMISSION_ROUTE"
              v-ripple
              class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-lock mr-2"></i>
              <span class="font-medium">Permissões</span>
            </a>
          </li>
        </ul>
      </div>
    </template>
  </Sidebar>
</template>

<script>
import RoutesName from "@/router/routes_name";

export default {
  props: ["vsb"],
  data() {
    return {
      RoutesName,
    };
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
};
</script>

<style>
</style>