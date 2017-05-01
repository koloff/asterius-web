<template>
  <div class="ui inverted menu header-menu">

    <div class="ui container" v-show="loggedIn">
      <router-link :to="'/program'" :tag="a" class="item">
        <i class="ui icon checked calendar"></i>
        PROGRAM
      </router-link>
      <!--<a class="item">-->
        <!--<i class="ui icon signal"></i>-->
        <!--PROGRESS-->
      <!--</a>-->
      <div class="ui dropdown item">
        <i class="ui icon settings calendar"></i>
        SPLIT
        <div class="menu">
          <router-link to="/generate" tag="a" class="item">
            <i class="ui icon child"></i>
            GENERATE NEW
          </router-link>
          <router-link to="/split" tag="a" class="item" :class="{disabled: !userParametersState.hasParameters}">
            <i class="ui icon options"></i>
            EDIT CURRENT
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
      <router-link to="/login" tag="a" class="item">
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

        this.$router.push('/login');
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