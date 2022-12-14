import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import FlowChart from 'flowchart-vue';

Vue.config.productionTip = false;

Vue.use(FlowChart)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
