<template>
  <div>

    <div class="ui divider big hidden"></div>
    <h1 class="ui header inverted center aligned">
      <div class="content">
        REGISTER
      </div>
    </h1>


    <div class="ui grid stackable centered">
      <div class="ui column eight wide">


        <div class="ui form error inverted">

          <div class="field">
            <label>E-MAIL</label>
            <div class="ui left icon input">
              <input v-model="email" type="text" name="e-mail"
                     placeholder="Your e-mail address">
              <i class="at icon"></i>
            </div>

            <div v-if="registerClicked && fields.email.error" class="ui pointing red basic label">
              {{fields.email.error}}
            </div>
          </div>


          <div class="field">
            <label>PASSWORD</label>

            <div class="ui left icon input">
              <input v-model="password" type="password" placeholder="Your password">
              <i class="lock icon"></i>
            </div>

            <div v-if="registerClicked && fields.password.error" class="ui pointing red basic label">
              {{fields.password.error}}
            </div>
          </div>


          <div @click="registerClick()" class="ui teal submit button fluid">Register</div>

          <div class="ui segment center aligned basic">
            <router-link :to="'/login'" class="white-link" href="" style="margin-right: 10px;">LOGIN
            </router-link>
            <a href="#" class="white-link">Forgotten password?</a>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import notifier from '../../utils/notifier';
  import authStore from '../../store/auth';

  export default {
    name: 'Register',
    data() {
      return {
        registerClicked: false,
        fields: {
          email: {
            value: '',
            error: ''
          },
          password: {
            value: '',
            error: ''
          }
        }
      }
    },
    methods: {
      async registerClick() {
        this.registerClicked = true;
        try {
          await authStore.register(this.email, this.password);
          await authStore.init();
          notifier('success', 'Registered successfully!');
          this.$router.push('/generate');
        } catch (err) {

          this.fields.email.error = '';
          this.fields.password.error = '';

          if (err.code === 'auth/weak-password') {
            this.fields.password.value = '';
            this.fields.password.error = 'Password must be at least 6 characters.'
          }
          if (err.code === 'auth/email-already-in-use') {
            this.fields.email.value = '';
            this.fields.email.error = 'Email already in use.'
          }
          if (err.code === 'auth/invalid-email') {
            this.fields.email.value = '';
            this.fields.email.error = 'Invalid email.'
          }

        }
      }
    }
  }
</script>