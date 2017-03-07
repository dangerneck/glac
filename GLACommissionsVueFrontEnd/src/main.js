import Vue from 'vue'
import Form from './components/commissionsForm.vue'
import store from './store'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

new Vue({
  el: '#app',
  store,
  render: h => h(Form)
})


function syncError(e){
  console.log(e);
}
