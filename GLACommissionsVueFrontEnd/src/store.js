import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    model: {
      name: '',
      email: '',
      address: '',
      phone: '',
      size: '',
      layout: '',
      favouriteColour: '',
      dateTimeNeeded: '',
      otherSizeValue: ''
    },
    sizes: [
      {value: '8"X10"', label: '8"X10"'},
      {value: '9"X12"', label: '9"X12"'},
      {value: '11"X14"', label: '11"X14"'},
      {value: '16"X20"', label: '16"X20"'},
      {value: '18"X24"', label: '18"X24"'},
      {value: '24"X30"', label: '24"X30"'},
      {value: '30"X30"', label: '30"X30"'},
      {value: '30"X36"', label: '30"X36"'},
      {value: '30"X40"', label: '30"X40"'},
      {value: '36"X48"', label: '36"X48"'},
      {value: '48"X60"', label: '48"X60"'},
      {value: 'Other', label: 'Other'}
    ],
    layouts: [
      {value: 'Landscape', label: 'Landscape'},
      {value: 'Portrait', label: 'Portrait'}
    ],
    submitting: false,
    pageMode: 'form',
    validationFail: false
  },
  mutations: {
    updateName (state,p){ state.model.name = p.target.value },
    updateEmail (state,p){ state.model.email = p.target.value },
    updateAddress (state,p){ state.model.address = p.target.value },
    updateSize (state,p){ state.model.size = p.target.value },
    updatePhone (state,p){ state.model.phone = p.target.value },
    updateLayout (state,p){ state.model.layout = p.target.value },
    updateFavouriteColour (state,p){ state.model.favouriteColour = p.target.value },
    updateDateTimeNeeded (state,p){ state.model.dateTimeNeeded = p},
    updateOtherSizeValue(state, p) { state.model.otherSizeValue = p.target.value },
    updateValidationFail(state, p) { state.validationFail = p }
  },
  actions: {
    submit(context){
      var self = context;
      self.state.submitting = true;
      var created = new Date().toString();
      var friendlySize = self.state.model.size.replace(/"/g,'');
      var computedId = self.state.model.dateTimeNeeded + '.' + friendlySize + '.' + self.state.model.layout + '.' + self.state.model.phone;

      axios.post('###', {
        _id: computedId,
        name: self.state.model.name,
        email: self.state.model.email,
        address: self.state.model.address,
        size: friendlySize,
        phone: self.state.model.phone,
        layout: self.state.model.layout,
        favouriteColour: self.state.model.favouriteColour,
        dateTimeNeeded: self.state.model.dateTimeNeeded,
        otherSizeValue: self.state.model.otherSizeValue,
        created: new Date().toString()
      }).then(function(r){
        self.state.submitting = false;
        self.state.pageMode = 'success';
      }).catch(function(e){
        self.state.submitting = false;
        self.state.pageMode = 'error';
      });

    },

  },
  getters: {
    name: (state) => { return state.model.name },
    email: (state) => { return state.model.email },
    address: (state) => { return state.model.address },
    size: (state) => { return state.model.size },
    phone: (state) => { return state.model.phone },
    layout: (state) => { return state.model.layout },
    favouriteColour: (state) => { return state.model.favouriteColour },
    dateTimeNeeded: (state) => { return state.model.dateTimeNeeded },
    otherSizeValue: (state) => { return state.model.otherSizeValue },
    sizes: (state) => { return state.sizes },
    layouts: (state) => { return state.layouts },
    pageMode: (state) => { return state.pageMode },
    submitting: (state) => { return state.submitting },
    validationFail: (state) => { return state.validationFail }
  }
});


