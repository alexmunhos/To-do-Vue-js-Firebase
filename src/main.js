import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import { auth } from './firebase'
import Button from "primevue/button"
import { Checkbox, InputText, Password } from 'primevue';
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast';

import 'primeicons/primeicons.css';


const app = createApp(App)
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Toast', Toast);
app.component('Checkbox', Checkbox);

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService)
app.mount('#app')
