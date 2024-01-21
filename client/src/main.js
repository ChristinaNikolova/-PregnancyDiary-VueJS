import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './store/auth';
import router from './routes/index';
import Jumbo from './components/shared/Jumbo.vue';
import AppInput from './components/shared/inputs/AppInput.vue';
import AppSelect from './components/shared/inputs/AppSelect.vue';
import AppTextarea from './components/shared/inputs/AppTextarea.vue';
import ClientError from './components/shared/errors/ClientError.vue';
import ServerError from './components/shared/errors/ServerError.vue';
import FormButton from './components/shared/buttons/Form.vue';
import AppTitle from './components/shared/AppTitle.vue';
import Empty from './components/shared/Empty.vue';
import Loading from './components/shared/Loading.vue';
import App from './App.vue';
import './styles/index.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const store = useAuthStore();
store.getPersistedProfile();

app.component('Jumbo', Jumbo);
app.component('AppInput', AppInput);
app.component('AppSelect', AppSelect);
app.component('AppTextarea', AppTextarea);
app.component('FormButton', FormButton);
app.component('ClientError', ClientError);
app.component('ServerError', ServerError);
app.component('AppTitle', AppTitle);
app.component('Empty', Empty);
app.component('Loading', Loading);
app.mount('#app');
