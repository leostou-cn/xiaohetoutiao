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
import './utils/disPlayListeten.js'
const pinia = createPinia()
const app = createApp(App)
app.directive('scroll', {
  mounted(el, { value }, VNode, preVn) {
    const scrollList = Array.from(document.querySelectorAll(`#${value}`))
    if (!value || !scrollList.length) {
      throw '锚点之间的"data-scroll-class"必须一一对应'
    }
    el.addEventListener('touchend', () => {
      const ele = scrollList.find(item => {
        return item.dataset.scrollClass === el.dataset.scrollClass
      })
      ele?.scrollIntoView({
        behavior: 'smooth',
      })
    })
  },
  unmounted(el) {
    el.removeEventListener('click', el)
  }
})

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
