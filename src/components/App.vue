<!--<template>-->
  <!--<div>-->

    <!--<div class="ui inverted segment">-->
      <!--<div :class="{active: chosenDays['monday']}" @click="toggleDay('monday')" class="ui basic inverted button blue">-->
        <!--Monday-->
      <!--</div>-->
      <!--<div :class="{active: chosenDays['tuesday']}" @click="toggleDay('tuesday')" class="ui basic inverted button blue">-->
        <!--Tuesday-->
      <!--</div>-->
      <!--<div :class="{active: chosenDays['wednesday']}" @click="toggleDay('wednesday')"-->
           <!--class="ui basic inverted button blue">Wednesday-->
      <!--</div>-->
      <!--<div :class="{active: chosenDays['thursday']}" @click="toggleDay('thursday')"-->
           <!--class="ui basic inverted button blue">Thursday-->
      <!--</div>-->
      <!--<div :class="{active: chosenDays['friday']}" @click="toggleDay('friday')" class="ui basic inverted button blue">-->
        <!--Friday-->
      <!--</div>-->
      <!--<div :class="{active: chosenDays['saturday']}" @click="toggleDay('saturday')"-->
           <!--class="ui basic inverted button blue">Saturday-->
      <!--</div>-->
      <!--<div :class="{active: chosenDays['sunday']}" @click="toggleDay('sunday')" class="ui basic inverted button blue">-->
        <!--Sunday-->
      <!--</div>-->
    <!--</div>-->


    <!--&lt;!&ndash;<h2>how many minutes can you spend in the gym:</h2>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="ui left icon input">&ndash;&gt;-->
    <!--&lt;!&ndash;<input v-model="sessionMinutes" type="text" placeholder="Time in minutes">&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="time icon"></i>&ndash;&gt;-->
    <!--&lt;!&ndash;<button @click="selectSessionMinutes()" class="ui button">go</button>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->


    <!--&lt;!&ndash;<h2>what is you fitness experience:</h2>&ndash;&gt;-->
    <!--&lt;!&ndash;untrained&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="ui huge star rating"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;advanced&ndash;&gt;-->

    <!--&lt;!&ndash;<br><br><br>&ndash;&gt;-->
    <!--&lt;!&ndash;<h1>&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;chosen days{{chosenDays}}<br>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;training level{{trainingLevel}}<br>&ndash;&gt;-->
    <!--&lt;!&ndash;maximumWeeklySets {{maximumWeeklySets}}&ndash;&gt;-->
    <!--&lt;!&ndash;</h1>&ndash;&gt;-->


    <!--<div class="ui segment">-->
      <!--<div v-for="(checkbox, key) in imageCheckboxes.upp" class="ui checkbox">-->
        <!--<input v-model="checkbox.checked" type="checkbox" name="example"/>-->
        <!--<label>{{checkbox.name}}</label>-->
      <!--</div>-->

      <!--<div>-->
        <!--<div class="ui cards five doubling">-->
          <!--<template v-for="muscleGroup in mc">-->
            <!--<muscle-mini-info-->
              <!--v-for="(muscle, key) in muscleGroup.parts"-->
              <!--v-if="isCheckedFromPictureByKey(key)"-->
              <!--:name="muscle.name"-->
              <!--:bro-name="muscle.broName"-->
            <!--/>-->
          <!--</template>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="ui four cards doubling">-->
      <!--<exercise-->
        <!--v-for="exercise in ec"-->
        <!--v-if="doesExerciseTrainCheckedMuscle(exercise)"-->
        <!--:name="exercise.name"-->
        <!--:type="exercise.type"-->
        <!--:musclesUsed="exercise.musclesUsed"-->
      <!--&gt;</exercise>-->
    <!--</div>-->


  <!--</div>-->
<!--</template>-->

<!--<script>-->

  <!--import _ from 'lodash';-->
  <!--import mc from '../algorithm/muscle/muscles-collection';-->
  <!--import ec from '../algorithm/exercise/exercises-collection';-->
  <!--import * as volume from '../algorithm/volume';-->

  <!--import Exercise from './exercise/Exercise.vue';-->
  <!--import MuscleMiniInfo from './muscle/MuslceMiniInfo.vue';-->

  <!--export default {-->
    <!--name: 'App',-->
    <!--components: {Exercise, MuscleMiniInfo},-->
    <!--data() {-->
      <!--return {-->
        <!--mc: mc,-->
        <!--ec: ec,-->
        <!--chosenDays: {-->
          <!--monday: 0,-->
          <!--tuesday: 0,-->
          <!--wednesday: 0,-->
          <!--thursday: 0,-->
          <!--friday: 0,-->
          <!--saturday: 0,-->
          <!--sunday: 0-->
        <!--},-->
        <!--imageCheckboxes: {-->
          <!--lowerBody: [-->
            <!--{name: 'Quadriceps muscle group', left: 58.70967741935483, top: 57.078651685393254, checked: false},-->
            <!--{name: 'Soleus, Gastrocnemius', left: 74.19354838709677, top: 65.61797752808988, checked: false},-->
            <!--{name: 'Hamstrings muscle group', left: 50, top: 57.752808988764045, checked: false},-->
            <!--{name: 'Gluteus muscles group', left: 48.225806451612904, top: 28.98876404494382, checked: false},-->
          <!--],-->
          <!--upperBodyFront: [-->
            <!--{name: 'Pectoralis major clavicular head', left: 36.868686868686865, top: 22.15568862275449, checked: false},-->
            <!--{name: 'Pectoralis major sternal head', left: 35.18518518518518, top: 39.12175648702595, checked: false},-->
            <!--{name: 'Deltoid anterior head', left: 76.43097643097643, top: 19.36127744510978, checked: false},-->
          <!--],-->
          <!--upperBodyBack: []-->
        <!--},-->
        <!--sessionMinutes: 70,-->
        <!--maximumWeeklySets: null-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--maximumWeeklySets() {-->
        <!--let daysCount = 0;-->
        <!--_.forOwn(this.chosenDays, (day) => {-->
          <!--if (day) daysCount++;-->
        <!--});-->

        <!--return volume.calculateMaximumWeeklySets(daysCount, this.sessionMinutes);-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->

      <!--$('.rating').rating({-->
        <!--initialRating: self.trainingLevel,-->
        <!--maxRating: 5,-->
        <!--onRate: (value) => {-->
          <!--this.trainingLevel = value;-->
        <!--}-->
      <!--});-->

    <!--},-->
    <!--methods: {-->
      <!--toggleDay(day) {-->
        <!--if (this.chosenDays[day]) {-->
          <!--this.chosenDays[day] = 0;-->
        <!--} else {-->
          <!--this.chosenDays[day] = 1;-->
        <!--}-->
      <!--},-->

      <!--selectSessionMinutes() {-->
        <!--console.log(this.sessionMinutes);-->
        <!--volume.calculateMaximumWeeklySets(3, this.sessionMinutes | 0, 3);-->
      <!--},-->

      <!--getMuscleByKey() {-->

      <!--},-->

      <!--isCheckedFromPictureByKey(key) {-->
        <!--return this.imageCheckboxes.lowerBody[key] && this.imageCheckboxes.lowerBody[key].checked ||-->
          <!--this.imageCheckboxes.upperBodyFront[key] && this.imageCheckboxes.upperBodyFront[key].checked ||-->
          <!--this.imageCheckboxes.upperBodyBack[key] && this.imageCheckboxes.upperBodyBack[key].checked-->
      <!--},-->

      <!--doesExerciseTrainCheckedMuscle(exercise) {-->
        <!--exercise.musclesUsed.forEach((muscle) => {-->
          <!--console.log(muscle);-->
        <!--});-->
        <!--return true;-->
      <!--},-->

    <!--}-->
  <!--}-->
<!--</script>-->

