import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routes/index';
import Jumbo from './components/shared/Jumbo.vue';
import AppInput from './components/shared/inputs/AppInput.vue';
import AppSelect from './components/shared/inputs/AppSelect.vue';
import AppTextarea from './components/shared/inputs/AppTextarea.vue';
import ClientError from './components/shared/errors/ClientError.vue';
import ServerError from './components/shared/errors/ServerError.vue';
import FormButton from './components/shared/buttons/Form.vue';
import Empty from './components/shared/Empty.vue';
import App from './App.vue';
import './styles/index.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.component('Jumbo', Jumbo);
app.component('AppInput', AppInput);
app.component('AppSelect', AppSelect);
app.component('AppTextarea', AppTextarea);
app.component('FormButton', FormButton);
app.component('ClientError', ClientError);
app.component('ServerError', ServerError);
app.component('Empty', Empty);
// app.component('Loading', Loading);
app.mount('#app');
