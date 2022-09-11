import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.css'
import 'vant/lib/index.css';
import { router } from './router/index'
import 'amfe-flexible'//移动端自适应
import { createPinia } from 'pinia'
import 'default-passive-events'
const pinia = createPinia()

const win: any = window

const app = createApp(App)

if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
}

app.directive('autoFocus', {
  mounted() {
    document.querySelector('input')?.focus()
    document.querySelector('textarea')?.focus()
  }
})

app.use(router).use(pinia).mount('#app')
