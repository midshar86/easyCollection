import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia"
import router from './router/index.js'
import 'vue-waterfall-plugin-next/dist/style.css'
// 初始化样式
import "normalize.css"
import "@/assets/index.scss"
import "@/iconfont/iconfont.css"

const pinia = createPinia()

const app = createApp(App)

// 注册一个全局指令
// app.directive("focus", {
//   updated: (el) => el.focus()
// })

app.use(router)
app.use(pinia)
app.mount('#app')
