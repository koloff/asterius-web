<template>
  <div>

    <div class="ui divider small hidden"></div>

    <div class="ui grid stackable">
      <div class="column five wide">
        <div class="ui fluid vertical steps">

          <router-link to="/parameters" tag="div" class="step link"
                       :class="{active: view === '/parameters'}"
          >
            <i class="child icon"></i>
            <div class="content">
              <div class="title">Stats</div>
              <div class="description">Your fitness level and training days</div>
            </div>
          </router-link>

          <router-link to="/muscles" tag="div" class="step link"
                       :class="{active: view === '/muscles', disabled: !userParametersState.hasParameters}"
          >
            <i class="star icon"></i>
            <div class="content">
              <div class="title">Muscles</div>
              <div class="description">What muscles you prefer to train</div>
            </div>
          </router-link>

          <router-link to="/split" tag="div" class="step link"
                       :class="{active: view === '/split', disabled: !userParametersState.hasParameters}">
            <i class="options icon"></i>
            <div class="content">
              <div class="title">Split</div>
              <div class="description">View and edit generated workouts</div>
            </div>
          </router-link>

        </div>
      </div>
      <div class="column eleven wide">
        <div class="ui segment" v-if="view !== '/split'">
          <div class="ui column centered">
            <transition
              mode="out-in"
              name="custom-classes-transition"
              enter-active-class="create-profile animated fadeIn"
              leave-active-class="create-profile animated fadeOut"
            >
              <parameters v-if="view === '/parameters'"></parameters>
              <preferred-muscles v-if="view === '/muscles'"></preferred-muscles>
            </transition>
          </div>
        </div>

        <split v-if="view === '/split'"></split>


        <div class="ui segment center aligned basic">
          <div v-if="view !== '/parameters'" class="ui button blue" @click="previousStep()">
            <i class="ui icon angle double left"></i>
            BACK
          </div>

          <div class="ui button green" @click="nextStep()">
            SAVE
            <i class="ui icon angle double right"></i>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Parameters from './parameters.vue';
  import PreferredMuscles from './PreferredMuscles.vue';
  import Split from './Split.vue';

  import notifier from '../../utils/notifier';

  import rootStore from '../../store/root';
  import userParametersStore from '../../store/user-parameters';
  import preferredMusclesStore from '../../store/preferred-muscles';
  import selectedExercisesStore from '../../store/selected-exercises';

  import * as http from '../../http/index';


  export default {
    name: 'EditProfile',
    components: {Parameters, PreferredMuscles, Split},
    data() {
      return {
        userParametersState: userParametersStore.state,
        preferredMusclesState: preferredMusclesStore.state,
        view: ''
      }
    },
    beforeCreate() {
    },
    methods: {
      async nextStep() {
        console.log(this.$route.path);
        if (this.view === '/parameters') {

          try {
            await userParametersStore.updateParameters();
            this.$router.push('/muscles')
          } catch (err) {
            notifier('error', 'Please provide correct data!')
          }

        } else if (this.view === '/muscles') {
          rootStore.setLoading(true);
          try {
            await preferredMusclesStore.updatePreferredMuscles();
            await http.getAuthorized('/algorithm/generate-split');
            this.$router.push('/split');
          } catch (err) {
            console.log(err);
            notifier('error', 'Please provide correct data!')
          }
          rootStore.setLoading(false);
        } else if (this.view === '/split') {
          this.$router.push('/program');
        }
      },
      previousStep() {
        if (this.view === '/muscles') {
          this.$router.push('/parameters')
        } else if (this.view === '/split') {
          this.$router.push('/muscles')
        }
      }
    },
    computed: {
      view() {
        return this.$route.path;
      },
      headerText() {
        switch (this.view) {
          case '/parameters':
            return '1. Stats';
          case '/muscles':
            return '2. Preferred muscles';
          case '/split':
            return '3. Tweak weekly volume';
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

