<template>
  <div>

    <h4 class="ui header dividing">What is your measuring unit?</h4>

    <div class="ui radio checkbox" style="margin-right: 10px;">
      <input value="metric" v-model="userParametersState.measuringUnit" type="radio" name="measuringUnit">
      <label>Metric (KG, CM)</label>
    </div>

    <div class="ui radio checkbox">
      <input value="imperial" v-model="userParametersState.measuringUnit" type="radio" name="measuringUnit">
      <label>Imperial (LBS, IN)</label>
    </div>


    <h4 class="ui header dividing">What are your measurements?</h4>
    <div class="ui grid equal width">
      <div class="ui column">

        <div class="ui input right labeled fluid">
          <input v-model="userParametersState.weight" type="text" placeholder="Weight">
          <div class="ui basic label">
            {{userParametersState.measuringUnit === 'metric' ? 'KG' : 'LBS'}}
          </div>
        </div>

      </div>
      <div class="ui column">

        <div class="ui input right labeled fluid">
          <input v-model="userParametersState.height" type="text" placeholder="Height">
          <div class="ui basic label">
            {{userParametersState.measuringUnit === 'metric' ? 'CM' : 'IN'}}
          </div>
        </div>

      </div>
    </div>

    <div class="ui divider hidden"></div>

    <h4 class="ui header dividing">What is your fitness experience?</h4>
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
      How many days a week on average can you train?
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
  </div>
</template>

<script>
  import userParametersStore from '../../store/user-parameters';

  export default {
    name: 'Parameters',
    data() {
      return {
        userParametersState: userParametersStore.state.userParameters
      }
    },
    mounted() {
      $('.dropdown').dropdown();
    },
    methods: {
    },
    computed: {
      state() {
        console.log(this.userParametersState);
        return this.userParametersState;
      }
    }
  }
</script>
