import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify';
import { VitePWA } from 'vite-plugin-pwa';

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
		VitePWA({ registerType: 'autoUpdate' }) // PWA 플러그인 추가
	],
})
