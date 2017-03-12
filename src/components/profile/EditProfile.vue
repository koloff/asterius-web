<template>
  <div>

    <div :class="{active: loading}" class="ui dimmer page">
      <div class="ui text loader">Loading</div>
    </div>

    <div class="ui divider hidden"></div>
    <h1 class="ui header inverted centered">ASTERIUS</h1>


    <transition
      mode="out-in"
      name="custom-classes-transition"
      enter-active-class="create-profile animated fadeIn"
      leave-active-class="create-profile animated fadeOut"
    >
      <stats v-if="view === 'stats'"></stats>
      <preferred-muscles v-if="view === 'preferredMuscles'"></preferred-muscles>
    </transition>


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

  export default {
    name: 'EditProfile',
    components: {Stats, PreferredMuscles},
    data() {
      return {
        loading: false,
        view: 'preferredMuscles',
      }
    },
    methods: {
      nextStep() {
        if (this.view === 'stats') {
          this.view = 'preferredMuscles';
        } else if (this.view === 'preferredMuscles') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$router.push('tweaker');
          }, 2000)
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

