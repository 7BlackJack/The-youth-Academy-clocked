import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.less'
import AntDesignVue from 'ant-design-vue'

const app = createApp(App)
app.use(AntDesignVue)
app.mount('#app')