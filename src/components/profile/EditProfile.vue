<template>
  <div>

    <div class="ui divider small hidden"></div>
    <h1 class="ui header">PROFILE</h1>


    <div class="ui grid stackable segment">
      <div class="ui column six wide centered">
          <transition
            mode="out-in"
            name="custom-classes-transition"
            enter-active-class="create-profile animated fadeIn"
            leave-active-class="create-profile animated fadeOut"
          >
            <stats v-if="view === 'stats'"></stats>
            <preferred-muscles v-if="view === 'preferredMuscles'"></preferred-muscles>
          </transition>
        </div>
    </div>


    <div class="ui segment center aligned basic">
      <button :class="{disabled: view === 'stats'}" class="ui button huge blue" @click="previousStep()">
        Back
      </button>

      <div v-if="view=== 'preferredMuscles'" class="ui button huge green" @click="nextStep()">
        <i class="ui icon flag checkered"></i> Final touches
      </div>

      <div v-else class="ui button huge green" @click="nextStep()">
        Next
      </div>
    </div>
  </div>
</template>

<script>
  import Stats from './Stats.vue';
  import PreferredMuscles from './PreferredMuscles.vue';
  import rootStore from '../../store/root';

  export default {
    name: 'EditProfile',
    components: {Stats, PreferredMuscles},
    data() {
      return {
        view: 'preferredMuscles',
      }
    },
    methods: {
      nextStep() {
        if (this.view === 'stats') {
          this.view = 'preferredMuscles';
        } else if (this.view === 'preferredMuscles') {
          rootStore.setLoadingProfile(true);
          setTimeout(() => {
            rootStore.setLoadingProfile(false);
            this.$router.push('tweaker');
          }, 1000)
        }
      },
      previousStep() {
        if (this.view === 'preferredMuscles') {
          this.view = 'stats'
        }
      }
    }
  }
</script>

<style>
  .create-profile {
    animation-duration: 0.4s;
  }
</style>

