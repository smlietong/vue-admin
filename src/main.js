import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入格式化样式文件
import 'normalize.css/normalize.css'

// import './assets/main.css'
// 导入对应的样式
// 在我们页面中需要使用反馈组件等需要通过 JS 打开的东西我们就需要导入全局样式
import 'element-plus/dist/index.css'

// 如果 store 中只有一个 index.js 那么路径可以不用加
import store from '@/store/index.js'

const app = createApp(App)

app.use(router)

// 将全局状态 store 挂载到 app 实例上
app.use(store)

app.mount('#app')
