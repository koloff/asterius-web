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
    <div class="ui buttons four choose-experience">
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
      What days in the week you can train?
    </h4>
    <div class="ui buttons seven choose-week-days">
      <div class="ui button" :class="{basic: !userParametersState.days['monday']}" @click="toggleDay('monday')">M</div>
      <div class="ui button" :class="{basic: !userParametersState.days['tuesday']}" @click="toggleDay('tuesday')">T
      </div>
      <div class="ui button" :class="{basic: !userParametersState.days['wednesday']}" @click="toggleDay('wednesday')">
        W
      </div>
      <div class="ui button" :class="{basic: !userParametersState.days['thursday']}" @click="toggleDay('thursday')">T
      </div>
      <div class="ui button" :class="{basic: !userParametersState.days['friday']}" @click="toggleDay('friday')">F</div>
      <div class="ui button" :class="{basic: !userParametersState.days['saturday']}" @click="toggleDay('saturday')">S
      </div>
      <div class="ui button" :class="{basic: !userParametersState.days['sunday']}" @click="toggleDay('sunday')">S</div>
    </div>
  </div>
</template>

<script>
  import userParametersStore from '../../store/user-parameters';

  export default {
    name: 'Parameters',
    data() {
      return {
        userParametersState: userParametersStore.state
      }
    },
    mounted() {
      $('.dropdown').dropdown();
    },
    methods: {
      toggleDay(day) {
        this.userParametersState.days[day] = !this.userParametersState.days[day];
      },
      update() {
        userParametersStore.updateParameters();
      }
    },
    computed: {
      state() {
        console.log(this.userParametersState);
        return this.userParametersState;
      }
    }
  }
</script>
