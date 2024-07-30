import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import store from './store';
import { loadFonts } from './plugins/webfontloader'
import { registerSW } from 'virtual:pwa-register';
import './registerServiceWorker'

registerSW({ immediate: true });


loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
