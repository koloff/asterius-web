<template>
  <div>

    <div class="ui form error">

      <div class="dividing teal ui  header">
        Register
      </div>

      <!--<div v-if="emailTaken" class="ui error message">-->
      <!--<p>This email is registered!</p>-->
      <!--</div>-->
      <!--<div v-if="usernameTaken" class="ui error message">-->
      <!--<p>This username is registered!</p>-->
      <!--</div>-->

      <div class="field">
        <label>E-mail</label>
        <div class="ui left icon input">
          <input v-model="email" type="text" name="e-mail"
                 placeholder="Your e-mail address">
          <i class="at icon"></i>
        </div>

        <div v-if="registerClicked && fields.email.error" class="ui pointing red basic label">
          {{fields.email.error}}
        </div>
      </div>

      <!--<div class="field">-->
      <!--<label>Username</label>-->
      <!--<div class="ui left icon input">-->
      <!--<input v-model="username" type="text" name="username"-->
      <!--placeholder="Your username">-->
      <!--<i class="user icon"></i>-->
      <!--</div>-->

      <!--<div v-if="clicked && $validation.username.invalid" class="ui pointing red basic label">-->
      <!--Username must be between 3 and 16 symbols and can contain only letters, numbers the symbols "-" and "_"!-->
      <!--</div>-->
      <!--</div>-->

      <div class="field">
        <label>Password</label>

        <div class="ui left icon input">
          <input v-model="password" type="password" placeholder="Your password">
          <i class="lock icon"></i>
        </div>

        <div v-if="registerClicked && fields.password.error" class="ui pointing red basic label">
          {{fields.password.error}}
        </div>
      </div>


      <div @click="registerClick()" class="ui teal submit button">Register</div>

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
          notifier('success', 'Registered successfully!');
          this.$router.push('/parameters');
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