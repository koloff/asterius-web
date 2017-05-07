<template>
  <div>

    <div class="ui divider big hidden"></div>
    <h1 class="ui  header inverted center aligned">
      <div class="content">
        LOGIN
      </div>
    </h1>

    <div class="ui grid stackable centered">
      <div class="ui column eight wide">
        <div class="ui form error inverted">
          <div class="content ui inverted">
            <div v-if="wrongCredentials" class="ui error message">
              <p>Wrong e-mail/password!</p>
            </div>

            <div class="field">
              <label>E-MAIL</label>
              <div class="ui left icon input">
                <input v-model="email" type="text" name="username" placeholder="Your email">
                <i class=" at icon"></i>
              </div>
            </div>
            <div class="field">
              <label>PASSWORD</label>
              <div class="ui left icon input">
                <input v-model="password" type="password" placeholder="Your password">
                <i class=" lock icon"></i>
              </div>
            </div>

            <div @click="loginClick()" class="ui blue submit button fluid">Login</div>

            <div class="ui segment center aligned basic">
              <router-link :to="'/register'" class="white-link" href="" style="margin-right: 10px;">REGISTER
              </router-link>
              <!--<a href="#" class="white-link">Forgotten password?</a>-->
            </div>

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
            await authStore.init();
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
