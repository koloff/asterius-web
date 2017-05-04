<template>
  <div>


    <div class="ui divider hidden"></div>

    <div class="ui grid stackable center aligned">
      <div class="column eight wide center aligned">

        <h2 class="ui icon header inverted">
          <i class="settings icon"></i>
          <div class="content">
            Personal Settings
            <div class="sub header">Manage your personal settings for optimal program.</div>
          </div>
        </h2>


        <div class="ui divider hidden"></div>
        <h5 class="ui header inverted" style="margin: 0 0 4px 0">GENDER</h5>
        <div class="ui small icon buttons two">
          <button class="ui button inverted"
                  :class="{selected: userParametersState.gender === 'male'}"
                  @click="userParametersState.gender = 'male'"
          ><i class="man male icon"></i> Male
          </button>
          <button class="ui button inverted"
                  :class="{selected: userParametersState.gender === 'female'}"
                  @click="userParametersState.gender = 'female'"
          ><i class="woman icon"></i>Female
          </button>
        </div>

        <div class="ui divider hidden"></div>
        <h5 class="ui header inverted" style="margin: 0 0 4px 0">UNITS</h5>

        <div class="ui small buttons two">
          <button class="ui button inverted"
                  @click="userParametersState.measuringUnit = 'metric'"
                  :class="{selected: userParametersState.measuringUnit === 'metric'}"
          >Metric (cm, kg)
          </button>
          <button class="ui button inverted"
                  @click="userParametersState.measuringUnit = 'imperial'"
                  :class="{selected: userParametersState.measuringUnit === 'imperial'}"
          >Imperial (lbs, in)
          </button>
        </div>


        <div class="ui divider hidden"></div>
        <div class="ui grid">
          <div class="six wide column right aligned">
            <h5 class="ui header inverted" style="margin: 0">AGE</h5>
            <div class="ui inverted transparent input massive fluid">
              <input v-model="userParametersState.age" style="text-align: right" type="text" placeholder="Age">
            </div>
            <h5 class="ui header inverted" style="margin: 0">years</h5>
          </div>

          <div class="four wide column center aligned">
            <h5 class="ui header inverted" style="margin: 0">WEIGHT</h5>
            <div class="ui inverted transparent input massive fluid">
              <input v-model="userParametersState.weight" style="text-align: center" type="text" placeholder="Weght">
            </div>
            <h5 class="ui header inverted" style="margin: 0">{{userParametersState.measuringUnit === 'metric' ? 'kg' :
              'lbs'}}</h5>
          </div>

          <div class="six wide column left aligned">
            <h5 class="ui header inverted" style="margin: 0">HEIGHT</h5>
            <div class="ui inverted transparent input massive fluid">
              <input v-model="userParametersState.height" style="text-align: left" type="text" placeholder="Height">
            </div>
            <h5 class="ui header inverted" style="margin: 0">{{userParametersState.measuringUnit === 'metric' ? 'cm' :
              'in'}}</h5>
          </div>
        </div>

        <div class="ui divider hidden"></div>

        <h4 class="ui header inverted  centered">FITNESS EXPERIENCE
        </h4>
        <div class="ui buttons four inverted experience-buttons">
          <button class="ui button green " :class="{basic: userParametersState.experience !== 'untrained'}"
                  @click="userParametersState.experience = 'untrained'">Untrained
          </button>
          <button class="ui button yellow" :class="{basic: userParametersState.experience !== 'beginner'}"
                  @click="userParametersState.experience = 'beginner'">Beginner
          </button>
          <button class="ui button orange" :class="{basic: userParametersState.experience !== 'advanced'}"
                  @click="userParametersState.experience = 'advanced'">Advanced
          </button>
          <button class="ui button red" :class="{basic: userParametersState.experience !== 'expert'}"
                  @click="userParametersState.experience = 'expert'">Expert
          </button>
        </div>

        <div class="ui divider hidden"></div>

        <!--todo: check on mobile-->
        <h4 class="ui header inverted  centered">
          WEEKLY TRAININGS
        </h4>
        <div class="ui buttons three">
          <div class="ui button inverted"
               :class="{selected: userParametersState.days == '1-2'}"
               @click="userParametersState.days = '1-2'">1 - 2 sessions / week
          </div>
          <div class="ui button inverted"
               :class="{selected: userParametersState.days == '3-4',}"
               @click="userParametersState.days = '3-4'">3 - 4 sessions / week
          </div>
          <div class="ui button inverted"
               :class="{selected: userParametersState.days == '5-6',}"
               @click="userParametersState.days = '5-6'">5 - 6 sessions / week
          </div>
        </div>

        <h4 class="ui header inverted">
          PREFERRED MUSCLES
        </h4>
        <muscles-selector :selected-muscles="userParametersState.preferredMuscles"></muscles-selector>
        <div v-if="selectedMuscles" style="margin-top: 5px" class="ui labels">
          <div class="ui label" v-for="muscle in selectedMuscles">{{muscle.info.broName}}
            <i class="delete icon" @click="labelMuscleRemoveClicked(muscle.key)"></i>
          </div>
        </div>

        <div class="ui divider hidden"></div>
        <button @click="save()" class="ui green big button fluid" style="margin-bottom: 10px">
          <i class="settings icon"></i>
          GENERATE
        </button>

      </div>

    </div>
  </div>
</template>

<script>
  import http from '../../http/http';
  import notifier from '../../utils/notifier';

  import musclesStore from '../../store/muscles';
  import rootStore from '../../store/root';
  import userParametersStore from '../../store/user-parameters';
  import MusclesSelector from '../muscles/MusclesSelector.vue';

  export default {
    name: 'Generate',
    components: {MusclesSelector},
    data() {
      return {
        userParametersState: userParametersStore.state.userParameters
      }
    },
    async beforeRouteEnter(to, from, next) {
      await userParametersStore.init();
      next();
    },
    mounted() {
      $('.ui.radio.checkbox').checkbox();
    },
    methods: {
      async save() {
        try {
          await userParametersStore.updateParameters();
          await http.getAuthorized('/algorithm/generate-split');
          this.$router.push('/split');
        } catch (err) {
          console.log(err);
          notifier('error', 'Please provide valid data!');
        }
      },
      labelMuscleRemoveClicked(mKey) {
        console.log(mKey);
        let index = this.userParametersState.preferredMuscles.indexOf(mKey);
        this.userParametersState.preferredMuscles.splice(index, 1);
      }
    },
    computed: {
      selectedMuscles() {
        return this.userParametersState.preferredMuscles.map((mKey) => musclesStore.getMuscle(mKey));
      }
    }
  }
</script>

<style scoped>
  .ui.inverted.button {
    box-shadow: 0px 0px 0px 1px #FFFFFF inset !important;
  }

  .button.selected {
    background: #FFFFFF !important;
    box-shadow: 0px 0px 0px 1px #FFFFFF inset !important;
    color: rgba(0, 0, 0, 0.8) !important;
  }

  .experience-buttons .button {
    padding: 11px 4px !important;;
  }
</style>