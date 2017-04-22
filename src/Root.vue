<template>
  <div>
    <div class="ui page dimmer" :class="{active: rootState.loading}">
      <div class="content">
        <div class="ui text loader">Loading</div>
      </div>
    </div>

    <div class="app">
      <header-menu></header-menu>

      <div class="ui container app-content">
        <router-view></router-view>
      </div>

      <bottom-footer></bottom-footer>
    </div>
  </div>
</template>

<script>
  import HeaderMenu from './HeaderMenu.vue';
  import BottomFooter from './BottomFooter.vue';
  import rootStore from './store/root';

  export default {
    name: 'App',
    components: {HeaderMenu, BottomFooter},
    data() {
      return {
        rootState: rootStore.state
      }
    }
  }
</script>
