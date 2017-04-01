<template>
  <div class="ui inverted menu header-menu">

    <div class="ui container" v-show="loggedIn">
      <a class="item">
        <i class="ui icon checked calendar"></i>
        PROGRAM
      </a>
      <!--<a class="item">-->
        <!--<i class="ui icon signal"></i>-->
        <!--PROGRESS-->
      <!--</a>-->
      <div class="ui dropdown item">
        GENERATE
        <div class="menu">
          <router-link to="/parameters" tag="a" class="item">
            <i class="ui icon child"></i>
            PARAMETERS
          </router-link>
          <router-link to="/muscles" tag="a" class="item" :class="{disabled: !userParametersState.hasParameters}">
            <i class="ui icon star"></i>
            MUSCLES
          </router-link>
          <router-link to="/tweaker" tag="a" class="item" :class="{disabled: !userParametersState.hasParameters}">
            <i class="ui icon options"></i>
            TWEAKER
          </router-link>
        </div>
        <i class="dropdown icon"></i>
      </div>

      <a class="item" @click="logout()">
        <i class="ui icon sign out"></i>
        LOGOUT
      </a>
    </div>

    <div class="ui container" v-show="!authState.uid">
      <router-link to="/authenticate" tag="a" class="item">
        <i class="ui icon sign out"></i>
        LOGIN
      </router-link>
    </div>

  </div>
</template>

<script>
  import notifier from './utils/notifier';
  import authStore from './store/auth';

  import userParametersStore from './store/user-parameters';

  export default {
    name: 'HeaderMenu',
    data() {
      return {
        authState: authStore.state,
        userParametersState: userParametersStore.state
      }
    },
    mounted() {
      $('.dropdown').dropdown();
    },
    methods: {
      logout() {
        authStore.logout();

        this.$router.push('/authenticate');
        notifier('success', 'You logged out!')
      }
    },
    computed: {
      loggedIn() {
        return this.authState.uid;
      }
    }
  }
</script>