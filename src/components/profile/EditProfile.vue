<template>
  <div>

    <div class="ui divider small hidden"></div>
    <h1 class="ui header" v-if="view !== '/tweaker'">PROFILE</h1>


    <div class="ui grid stackable segment" v-if="view !== '/tweaker'">
      <div class="ui column six wide centered">
        <transition
          mode="out-in"
          name="custom-classes-transition"
          enter-active-class="create-profile animated fadeIn"
          leave-active-class="create-profile animated fadeOut"
        >
          <stats v-if="view === '/stats'"></stats>
          <preferred-muscles v-if="view === '/muscles'"></preferred-muscles>
        </transition>
      </div>
    </div>

    <tweaker v-if="view === '/tweaker'"></tweaker>


    <div class="ui segment center aligned basic">
      <div v-if="view === '/stats'" class="ui button green" @click="nextStep()">
        Choose preferred muscles
        <i class="ui icon angle double right"></i>
      </div>

      <div v-if="view === '/muscles'" class="ui button blue" @click="previousStep()">
        <i class="ui icon angle double left"></i>
        Stats
      </div>

      <div v-if="view === '/muscles'" class="ui button green" @click="nextStep()">
        Generate exercises
        <i class="ui icon angle double right"></i>
      </div>

      <div v-if="view === '/tweaker'" class="ui button blue" @click="previousStep()">
        <i class="ui icon angle double left"></i>
        Preferred muscles
      </div>

      <div v-if="view === '/tweaker'" class="ui button green" @click="nextStep()">
        Generate split
        <i class="ui icon angle double right"></i>
      </div>


    </div>
  </div>
</template>

<script>
  import Stats from './Stats.vue';
  import PreferredMuscles from './PreferredMuscles.vue';
  import Tweaker from '../tweaker/Tweaker.vue';
  import rootStore from '../../store/root';

  export default {
    name: 'EditProfile',
    components: {Stats, PreferredMuscles, Tweaker},
    data() {
      return {}
    },
    methods: {
      nextStep() {
        console.log(this.$route.path);
        if (this.view === '/stats') {
          this.$router.push('/muscles')
        } else if (this.view === '/muscles') {
          rootStore.setLoading(true);
          setTimeout(() => {
            rootStore.setLoading(false);
            this.$router.push('/tweaker')
          }, 1000)
        } else if (this.view === '/tweaker') {
          console.log('next');
        }
      },
      previousStep() {
        if (this.view === '/muscles') {
          this.$router.push('/stats')
        } else if (this.view === '/tweaker') {
          this.$router.push('/muscles')
        }
      }
    },
    computed: {
      view() {
        let route = this.$route.path;
        return route;
      }
    }
  }
</script>

<style>
  .create-profile {
    animation-duration: 0.4s;
  }
</style>

