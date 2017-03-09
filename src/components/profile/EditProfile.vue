<template>
  <div>
    <div class="ui divider hidden"></div>
    <h1 class="ui header inverted centered">ASTERIUS</h1>
    <div class="ui divider hidden"></div>

    <transition
      mode="out-in"
      name="custom-classes-transition"
      enter-active-class="create-profile animated slideInRight"
      leave-active-class="create-profile animated slideOutLeft"
    >
      <stats v-if="view === 'stats'"></stats>
      <preferred-muscles v-if="view === 'preferredMuscles'"></preferred-muscles>
    </transition>

    <div class="ui segment center aligned basic">
      <button :class="{disabled: view === 'stats'}" class="ui button huge blue" @click="previousStep()">
        Back
      </button>
      <div class="ui button huge green" @click="nextStep()">
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
        view: 'preferredMuscles',
      }
    },
    methods: {
      nextStep() {
        if (this.view === 'stats') {
          this.view = 'preferredMuscles'
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

