import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Lazyload } from 'vant';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'vant/lib/index.css' // 引入vant组件样式
import App from './App.vue'
import translateDirective from './directives/translate';
import router from './router'
import Vant from 'vant'
import 'tdesign-mobile-vue/es/style/index.css';// 引入tDesign组件样式
import "default-passive-events";// 解决非被动事件监听警告，提升滚动性能  



const app = createApp(App)

app.use(createPinia())
app.use(Vant)
app.use(router)
app.use(Lazyload)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.directive('translate', translateDirective);
app.mount('#app')
