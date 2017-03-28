<template>
  <div>

    <div class="ui form error">
      <div class="content">

        <div class="dividing blue ui  header">
          Login
        </div>

        <div v-if="wrongCredentials" class="ui error message">
          <p>Wrong username/password!</p>
        </div>

        <div class="field">
          <label>Email</label>
          <div class="ui left icon input">
            <input v-model="email" type="text" name="username" placeholder="Your email">
            <i class=" at icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="ui left icon input">
            <input v-model="password" type="password" placeholder="Your password">
            <i class=" lock icon"></i>
          </div>
        </div>

        <div @click="loginClick()" class="ui blue submit button">Login</div>

      </div>
    </div>

  </div>
</template>

<script>
  import notifier from '../../utils/notifier';
  import authStore from '../../store/auth';

  export default {
    name: 'Login',
    data() {
      return {
        wrongCredentials: false,
        email: '',
        password: ''
      }
    },
    methods: {
      async loginClick() {
        if (this.email && this.password) {
          try {
            await authStore.login(this.email, this.password);
            notifier('success', 'Logged in successfully!');
            this.$router.push('/program');
          } catch (err) {
            console.log(err);
            this.wrongCredentials = true;
          }
        }
      }
    }
  }
</script>