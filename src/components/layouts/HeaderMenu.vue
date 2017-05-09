<template>
  <div class="ui inverted menu compact header-menu">
    <div class="ui container header-menu-container" v-show="loggedIn">
      <div class="ui dropdown item">
        <i class="ui icon checkmark box calendar menu-icon"></i>
        TRAIN
        <div class="menu">
          <div class="ui item">
            <div class="ui sub header">NEXT SPLIT WORKOUT:</div>
            <div class="ui buttons">
              <button class="ui button green">A</button>
              <button class="ui button ">B</button>
              <button class="ui button ">C</button>
              <div class="or inverted basic"></div>
              <button class="ui button blue">CREATE CUSTOM</button>
            </div>
          </div>
        </div>
        <i class="dropdown icon"></i>
      </div>

      <div class="ui dropdown item">
        <i class="ui icon settings calendar menu-icon"></i>
        SPLIT
        <div class="menu">
          <router-link to="/generate" tag="a" class="item">
            <i class="ui icon child"></i>
            GENERATE NEW
          </router-link>
          <router-link to="/split" tag="a" class="item"
                       :class="{disabled: Object.keys(splitState.split).length === 0 && splitState.split.constructor === Object}">
            <i class="ui icon options"></i>
            EDIT CURRENT
          </router-link>
        </div>
        <i class="dropdown icon"></i>
      </div>

      <a class="ui item dropdown">
        <i class="ui icon signal menu-icon"></i>
        PROGRESS
        <div class="menu">
          <router-link to="/generate" tag="a" class="item">
            <i class="ui icon child"></i>
            GENERATE NEW
          </router-link>
          <router-link to="/split" tag="a" class="item"
                       :class="{disabled: Object.keys(splitState.split).length === 0 && splitState.split.constructor === Object}">
            <i class="ui icon options"></i>
            EDIT CURRENT
          </router-link>
        </div>
        <i class="dropdown icon"></i>
      </a>

      <a class="item" @click="logout()">
        <i class="ui icon sign out menu-icon"></i>
        LOGOUT
      </a>

      <a class="item">
        <i class="ui icon circle thin menu-icon"></i>
        HINTS
      </a>


    </div>

    <div class="ui container header-menu-container" v-show="!authState.uid">
      <router-link to="/login" tag="a" class="item">
        <i class="ui icon sign out menu-icon"></i>
        LOGIN
      </router-link>
    </div>

  </div>
</template>

<script>
  import notifier from '../../utils/notifier';
  import authStore from '../../store/auth';

  import splitStore from '../../store/split';

  export default {
    name: 'HeaderMenu',
    data() {
      return {
        authState: authStore.state,
        splitState: splitStore.state
      }
    },
    async mounted() {
      $('.dropdown').dropdown();
      await splitStore.init();
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

<style>
  .header-menu {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    background: #000000 !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 0 !important;
    text-align: center !important;
  }

  .header-menu-container {
    justify-content: center !important;
  }

  @media (max-width: 550px) {

    .header-menu .item {
      padding: 27px 5px 5px 5px !important;
      margin: 0 !important;
      font-size: 0.9em !important;
    }
    .header-menu .item:not(:first-child) {
      border-left: 1px solid rgba(255, 255, 255, 0.3) !important;
    }

    .header-menu .menu-icon {
      position: absolute !important;
      top: 8px !important;
      left: 0 !important;
      right: 0 !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
  .header-menu .icon.dropdown {
    margin-left: 5px !important;
  }
</style>