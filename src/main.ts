import { createApp } from 'vue'

import App from '@/App.vue'
//导入store
import store from './store/index'

//引入路由文件
import router from '@/router/index'

//引入Element组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//使用路由组件
const app = createApp(App)
//全局注册饿了么图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')


