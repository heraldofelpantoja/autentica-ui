/* eslint-disable vue/multi-word-component-names */
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";

import "primeflex/primeflex.css";

import "primeicons/primeicons.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Button from "primevue/button";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Toolbar from "primevue/toolbar";
import Fieldset from "primevue/fieldset";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";

const app = createApp(App);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

app.use(store);
app.use(router);

app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("InputText", InputText);
app.component("InputMask", InputMask);
app.component("Toolbar", Toolbar);
app.component("Column", Column);
app.component("Fieldset", Fieldset);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Toast", Toast);
app.component("Dropdown", Dropdown)
app.component("MultiSelect", MultiSelect)

app.mount("#app");

