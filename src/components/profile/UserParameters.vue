<template>
  <div>

    <div class="ui segment" style="padding: 10px 0">

      <div class="ui grid stackable centered user-parameters">
        <div class="ui column eight wide">

          <h4 class="ui header dividing">UNITS</h4>

          <div class="ui radio checkbox" style="margin-right: 10px;">
            <input value="metric" v-model="userParametersState.measuringUnit" type="radio" name="measuringUnit">
            <label>Metric (KG, CM)</label>
          </div>

          <div class="ui radio checkbox">
            <input value="imperial" v-model="userParametersState.measuringUnit" type="radio" name="measuringUnit">
            <label>Imperial (LBS, IN)</label>
          </div>


          <h4 class="ui header dividing">PARAMETERS</h4>
          <div class="ui grid equal width info-grid">
            <div class="ui column">
              <div class="ui input fluid">
                <input v-model="userParametersState.age" type="text" placeholder="Age">
              </div>
            </div>
            <div class="ui column">

              <div class="ui input right labeled fluid">
                <input v-model="userParametersState.weight" type="text" placeholder="Weight">
                <div class="ui basic label" style="padding: 10px 5px">
                  {{userParametersState.measuringUnit === 'metric' ? 'KG' : 'LBS'}}
                </div>
              </div>

            </div>
            <div class="ui column">

              <div class="ui input right labeled fluid">
                <input v-model="userParametersState.height" type="text" placeholder="Height">
                <div class="ui basic label" style="padding: 10px 5px">
                  {{userParametersState.measuringUnit === 'metric' ? 'CM' : 'IN'}}
                </div>
              </div>

            </div>
          </div>

          <div class="ui divider hidden"></div>

          <h4 class="ui header dividing">FITNESS EXPERIENCE</h4>
          <div class="ui buttons four">
            <button class="ui button" :class="{basic: userParametersState.experience !== 'untrained'}"
                    @click="userParametersState.experience = 'untrained'">Untrained
            </button>
            <button class="ui button " :class="{basic: userParametersState.experience !== 'beginner'}"
                    @click="userParametersState.experience = 'beginner'">Beginner
            </button>
            <button class="ui button " :class="{basic: userParametersState.experience !== 'advanced'}"
                    @click="userParametersState.experience = 'advanced'">Advanced
            </button>
            <button class="ui button " :class="{basic: userParametersState.experience !== 'expert'}"
                    @click="userParametersState.experience = 'expert'">Expert
            </button>
          </div>

          <div class="ui divider hidden"></div>

          <!--todo: check on mobile-->
          <h4 class="ui header dividing">
            WEEKLY TRAINING DAYS
          </h4>
          <div class="ui buttons four">
            <button class="ui button" :class="{basic: userParametersState.days !== '1-2'}"
                    @click="userParametersState.days = '1-2'">1 or 2 days
            </button>
            <button class="ui button " :class="{basic: userParametersState.days !== '3-4'}"
                    @click="userParametersState.days = '3-4'">3 or 4 days
            </button>
            <button class="ui button " :class="{basic: userParametersState.days !== '5-6'}"
                    @click="userParametersState.days = '5-6'">5 or 6 days
            </button>
          </div>

          <h4 class="ui header dividing">
            PREFERRED MUSCLES
          </h4>
          <muscles-selector :selectedMuscles="userParametersState.preferredMuscles"></muscles-selector>

          <div class="ui divider"></div>

          <button @click="save()" class="ui green big button fluid">
            <i class="settings icon"></i>
            GENERATE
          </button>


        </div>
      </div>

    </div>

  </div>
</template>

<script>
//  import notifier from '../../utils/notifier';
  import http from '../../http/http';

  import rootStore from '../../store/root';
  import userParametersStore from '../../store/user-parameters';
  import MusclesSelector from '../muscles/MusclesSelector.vue';

  export default {
    name: 'Parameters',
    components: {MusclesSelector},
    data() {
      return {
        userParametersState: userParametersStore.state.userParameters
      }
    },
    mounted() {
      $('.dropdown').dropdown();
    },
    methods: {
      async save() {
        try {
          await userParametersStore.updateParameters();
          await http.getAuthorized('/algorithm/generate-split');
        } catch (err) {
         console.log(err);
        }
      }
    },
    computed: {
    }
  }
</script>

<style>
  .info-grid {
    padding: 0 8px !important;
  }

  .info-grid > .ui.column {
    padding: 10px 5px !important;
  }

  .info-grid .ui.column input {
    padding: 10px 5px !important;
  }

  .user-parameters .ui .buttons .button {
    padding: 10px 7px !important;
  }
</style>
