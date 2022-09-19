import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.css'
import 'vant/es/notify/style';
import 'vant/es/dialog/style';
import { router } from './router/index'
import 'amfe-flexible'//移动端自适应
import { createPinia } from 'pinia'
import 'default-passive-events'
import 'highlight.js/styles/default.css'
const pinia = createPinia()

const win: any = window

const app = createApp(App)

app.directive('autoFocus', {
  mounted() {
    document.querySelector('input')?.focus()
    document.querySelector('textarea')?.focus()
  },
  updated() {
    document.querySelector('input')?.focus()
    document.querySelector('textarea')?.focus()
  },
})

app.use(router).use(pinia).mount('#app')
