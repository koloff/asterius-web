<template>
  <div>
    <div :class="{active: rootState.loadingProfile}" class="ui dimmer page">
      <div class="ui text loader">Loading</div>
    </div>

    <div :class="{active: rootState.loadingTweaker}" class="ui dimmer page">
      <div class="ui text loader">Creating split</div>
    </div>


    <div class="ui container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  
  import rootStore from './store/root';
  
  export default {
    data() {
      return {
        rootState: rootStore.state
      }
    },
    name: 'App'
  }
</script>
