<template>

  <div class="container">
    <div class="row header-row">
      <div class="col-xs">
        <header>
          <div class="flex-items-xs-middle banner">
            <a href="https://gabbylove.bigcartel.com" title="Gabby Love">
              <img src="https://s3-ap-southeast-2.amazonaws.com/data.gabbylovesart.com/images/logo-paint-white.png" alt="Gabby Love Store">
            </a>
          </div>
        </header>
      </div>
    </div>
    <div class="row form-row" v-if="pageMode == 'form'">
      <div class="col-xs">
          <h2 class="text-center">Commissions</h2>
          <p>Please fill out this form if you would like to purchase an original Gabby Love acrylic painting on canvas. Once I have received your completed form I will email you a quote. For all other commission enquiries please email gabby@gabbyloveart.com.</p>
          <p>There is a slight 10% increase in price for commissions to cover the extra time and care put into your painting. This includes a photo update on the progress of the work. Once details have been confirmed and you are happy to go ahead with the commission a 10% non refundable deposit will be invoiced. This covers material costs and time in the event the commission is cancelled. Commission works can be paid in installments.</p>
      </div>
    </div>
    <div class="row form-row" v-if="pageMode == 'form'">
      <div class="col-xs">
        <form>
          <fieldset>
            <div class="form-group">
              <label  for="name">Name</label>
              <input type="text" name="name" class="form-control" id="name" data-vv-as="Name" aria-describedby="name" placeholder="Your name" :value="name" @input="updateName" v-validate data-vv-rules="required">
              <small id="nameError" class="form-text text-muted" v-show="errors.has('name')">{{ errors.first('name') }}</small>
            </div>
            <div class="form-group">
                <label  for="address">Address</label>
                <input type="text" name="address" class="form-control" id="address" data-vv-as="Address" aria-describedby="emailHelp" placeholder="Your street address" :value="address" @input="updateAddress" v-validate data-vv-rules="required">
                <small id="addressError" class="form-text text-muted" v-show="errors.has('address')">{{ errors.first('address') }}</small>
            </div>
            <div class="form-group">
              <label  for="email">Email address</label>
              <input type="text" name="email" class="form-control" id="email" aria-describedby="emailHelp" data-vv-as="Email" placeholder="Your email address" :value="email" @input="updateEmail" v-validate data-vv-rules="required|email">
              <small id="emailError" class="form-text text-muted" v-show="errors.has('email')">{{ errors.first('email') }}</small>
            </div>
            <div class="form-group">
              <label  for="phone">Mobile</label>
              <input type="text" name="phone" class="form-control" id="phone" data-vv-as="Mobile number" aria-describedby="phone" placeholder="Your mobile number" :value="phone" @input="updatePhone" v-validate data-vv-rules="required">
              <small id="phoneError" class="form-text text-muted" v-show="errors.has('phone')">{{ errors.first('phone') }}</small>
            </div>
            <div class="form-group">
              <label  for="size">
                Size
                  <small class="form-text">Please select what size you would like your painting from the list below or select other to specify a size. Custom sizing may increase price and timeframe to allow for the canvas to be made to your specifications. </small>
              </label>          
              <select class="form-control" id="size" name="size" :value="size" @input="updateSize" data-vv-as="Size" v-validate data-vv-rules="required" placeholder="Choose a size">
                <option value="" disabled seleceted hidden>Choose a size</option>
                <option v-for="size in sizes" v-bind:value="size.value">{{size.label}}</option>
              </select>
              <small id="sizeError" class="form-text text-muted" v-show="errors.has('size')">{{ errors.first('size') }}</small>     
            </div>
            <div class="form-group" v-if="size == 'Other'">
              <label  for="size">Describe the size you want</label>
              <input type="text" name="otherSizeValue" class="form-control" id="otherSizeValue" aria-describedby="emailHelp" placeholder="Size" :value="otherSizeValue" @input="updateOtherSizeValue" v-validate data-vv-rules="required">
            </div>
            <div class="form-group">
              <label  for="layout">Layout</label>
              <select class="form-control" id="layout" data-vv-as="Layout" name="layout" :value="layout" @input="updateLayout" v-validate data-vv-rules="required">
                  <option value="" disabled seleceted hidden>Choose a layout</option>
                <option v-for="layout in layouts" v-bind:value="layout.value">{{layout.label}}</option>
              </select>
              <small id="layoutError" class="form-text text-muted" v-show="errors.has('layout')">{{ errors.first('layout') }}</small>  
            </div>
            <div class="form-group">
              <label  for="favouriteColour">Do you have a favourite colour that you absolutely must see in your painting?</label>
              <input type="text" name="favouriteColour" class="form-control" data-vv-as="Favourite colour" id="email" aria-describedby="emailHelp" :value="favouriteColour" @input="updateFavouriteColour" v-validate data-vv-rules="required" placeholder="Your favourite colour(s)">
              <small id="favouriteColourError" class="form-text text-muted" v-show="errors.has('favouriteColour')">{{ errors.first('favouriteColour') }}</small>
            </div>
            <div class="form-group">
              <label  for="dateTimeNeeded">
                Date needed
                 <small class="form-text">Do you need your painting by a certain time? Commissions can take anywhere from one to four months so please tell me if you need it by your Mum's birthday next month so we can work this out!</small>
              </label>
              <!--<input type="text" name="dateTimeNeeded" class="form-control" id="dateTimeNeeded" aria-describedby="dateTimeNeededHelp" placeholder="Date needed if applicable" :value="dateTimeNeeded" @input="updateDateTimeNeeded"
                v-validate data-vv-rules="required"> -->
                <date-picker :date="dateHolder" :option="datePickerOptions" id="dateTimeNeeded" class="date-picker"  @change="updateDateTimeNeeded"></date-picker>
              <small id="dateTimeNeededError" class="form-text text-muted" v-show="errors.has('dateTimeNeeded')">{{ errors.first('dateTimeNeeded') }}</small>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
      <div class="row form-row" v-if="pageMode == 'form'">
          <div class="col-xs">
              <br />
          </div>
      </div>
    <div class="row form-row" v-if="pageMode == 'form'">
        <div class="col-xs">
            <button type="submit" class="btn btn-primary " v-on:click="submitForm">Submit</button>
            <h6 v-if="submitting"><br />Submitting, please wait...</h6>
            <h6 v-if="validationFail"><br />Please complete the required fields above.</h6>
        </div>
    </div>

    <div class="row success-row" v-if="pageMode == 'success'">
        <div class="col-xs">
        <h2 class="text-center">Thank you for filling this out! I will be in touch with a quote.</h2>
        <h2 class="text-center">- Gabby Love</h2>
        </div>
    </div>
    <div class="row error-row" v-if="pageMode == 'error'">
        <div class="col-xs">
          <h2 class="text-center">There has been an error. You can <a v-on:click="submitForm">try submitting again</a> or contact me at gabby@gabbylovesart.com</h2>
        </div>
    </div>      
    <div class="row ">
        <div class="col-xs">
           <br />
           <br />
        </div>
    </div>      
  </div>


</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import datepicker from 'vue-datepicker';

  export default {
    data: function(){
        return {
            datePickerOptions :{
                wrapperClass: 'form-control',
                inputClass: 'form-control',
                format: 'DD/MM/YYYY',
                placeholder: 'Date needed if applicable',
                type: 'day',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                inputStyle: {

                },
                color: {
                    header: '#ccc',
                    headerText: '#f00'
                },
                buttons: {
                    ok: 'Ok',
                    cancel: 'Cancel'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true // as true as default
            },
            dateHolder: {
                time: ''
            }
        };
    },
      computed: mapGetters({
        name: 'name',
        email: 'email',
        address: 'address',
        phone: 'phone',
        size: 'size',
        layout: 'layout',
        favouriteColour: 'favouriteColour',
        dateTimeNeeded: 'dateTimeNeeded',
        sizes: 'sizes',
        layouts: 'layouts',
        otherSizeValue: 'otherSizeValue',
        submitting: 'submitting',
        pageMode: 'pageMode',
        validationFail: 'validationFail'
      }),
      methods:{
        ...mapActions([
          'submit'
        ]),
        ...mapMutations([
          'updateName', 'updateEmail', 'updateAddress', 'updatePhone', 'updateSize', 'updateLayout', 'updateFavouriteColour', 'updateDateTimeNeeded', 'updateOtherSizeValue', 'updateValidationFail'
        ]),
        submitForm: function(){
            self = this;
            self.updateValidationFail(false);
            this.$validator.validateAll().then(success => {
                if (! success) {
                    self.updateValidationFail(true);
                    return;
                }
                self.submit();
            }).catch(e => {
                self.updateValidationFail(true);
            });          
        }
      },
    components:{
        'date-picker': datepicker
    }
}
</script>
