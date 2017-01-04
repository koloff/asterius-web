<template>
  <div>

    <div class="ui inverted segment">
      <div :class="{active: chosenDays['monday']}" @click="toggleDay('monday')" class="ui basic inverted button blue">
        Monday
      </div>
      <div :class="{active: chosenDays['tuesday']}" @click="toggleDay('tuesday')" class="ui basic inverted button blue">
        Tuesday
      </div>
      <div :class="{active: chosenDays['wednesday']}" @click="toggleDay('wednesday')"
           class="ui basic inverted button blue">Wednesday
      </div>
      <div :class="{active: chosenDays['thursday']}" @click="toggleDay('thursday')"
           class="ui basic inverted button blue">Thursday
      </div>
      <div :class="{active: chosenDays['friday']}" @click="toggleDay('friday')" class="ui basic inverted button blue">
        Friday
      </div>
      <div :class="{active: chosenDays['saturday']}" @click="toggleDay('saturday')"
           class="ui basic inverted button blue">Saturday
      </div>
      <div :class="{active: chosenDays['sunday']}" @click="toggleDay('sunday')" class="ui basic inverted button blue">
        Sunday
      </div>
    </div>


    <!--<h2>how many minutes can you spend in the gym:</h2>-->
    <!--<div class="ui left icon input">-->
    <!--<input v-model="sessionMinutes" type="text" placeholder="Time in minutes">-->
    <!--<i class="time icon"></i>-->
    <!--<button @click="selectSessionMinutes()" class="ui button">go</button>-->
    <!--</div>-->


    <!--<h2>what is you fitness experience:</h2>-->
    <!--untrained-->
    <!--<div class="ui huge star rating"></div>-->
    <!--advanced-->

    <!--<br><br><br>-->
    <!--<h1>-->
    <!--&lt;!&ndash;chosen days{{chosenDays}}<br>&ndash;&gt;-->
    <!--training level{{trainingLevel}}<br>-->
    <!--maximumWeeklySets {{maximumWeeklySets}}-->
    <!--</h1>-->

    <div class="ui checkbox">
      <input v-model="muscle_1" type="checkbox" name="example">
      <label></label>
    </div>
    <br><br><br>

    {{muscle_1}}


    <div v-for="muscleGroup in mc">
      <h1>{{muscleGroup.name}}</h1>
      <div class="ui cards five doubling">
        <muscle-mini-info v-for="muscle in muscleGroup.parts"
                          :name="muscle.name"
                          :bro-name="muscle.broName"
        />
      </div>
    </div>


    <!--<div v-for="muscle in mc">{{muscle.name}} {{muscle.mrv}}</div>-->
    <!--<div class="ui six cards doubling">-->
    <!--<exercise-->
    <!--v-for="exercise in ec"-->
    <!--:name="exercise.name"-->
    <!--:musclesUsed="exercise.musclesUsed"-->
    <!--&gt;</exercise>-->
    <!--</div>-->



  </div>
</template>

<script>

  import _ from 'lodash';
  import mc from '../algorithm/muscle/muscles-collection';
  //  import ec from '../algorithm/exercise/exercises-collection';
  import * as volume from '../algorithm/volume';

  import Exercise from './exercise/Exercise.vue';
  import MuscleMiniInfo from './muscle/MuslceMiniInfo.vue';

  export default {
    name: 'App',
    components: {Exercise, MuscleMiniInfo},
    data() {
      return {
        muscle_1: null,
        mc: mc,
        //        ec: ec,
        chosenDays: {
          monday: 0,
          tuesday: 0,
          wednesday: 0,
          thursday: 0,
          friday: 0,
          saturday: 0,
          sunday: 0
        },
        sessionMinutes: 70,
        maximumWeeklySets: null
      }
    },
    computed: {
      maximumWeeklySets() {
        let daysCount = 0;
        _.forOwn(this.chosenDays, (day) => {
          if (day) daysCount++;
        });

        return volume.calculateMaximumWeeklySets(daysCount, this.sessionMinutes);
      }
    },
    mounted() {

      $('.rating').rating({
        initialRating: self.trainingLevel,
        maxRating: 5,
        onRate: (value) => {
          this.trainingLevel = value;
        }
      });

    },
    methods: {
      toggleDay(day) {
        if (this.chosenDays[day]) {
          this.chosenDays[day] = 0;
        } else {
          this.chosenDays[day] = 1;
        }
      },

      selectSessionMinutes() {
        console.log(this.sessionMinutes);
        volume.calculateMaximumWeeklySets(3, this.sessionMinutes | 0, 3);
      }
    }
  }
</script>

