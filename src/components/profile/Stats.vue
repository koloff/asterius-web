<template>
  <div>
    <h4 class="ui header">1. What are your measurements?</h4>
    <div class="ui grid">
      <div class="eight wide column right aligned">

        <div class="ui transparent input massive fluid">
          <input v-model="height.value" style="text-align: right" type="text" placeholder="Height">
        </div>
        <h3 class="ui header grey" style="display: inline;">
          <div class="ui simple dropdown">
            {{height.type}}<i class="dropdown icon" style="margin-left: 3px;"></i>
            <div class="menu">
              <div @click="height.type = 'CM'" class="item">CM</div>
              <div @click="height.type = 'IN'" class="item">IN</div>
            </div>
          </div>
        </h3>
      </div>

      <div class="eight wide column">
        <div class="eight wide column">
          <div class="ui transparent input massive fluid">
            <input v-model="weight.value" type="text" placeholder="Weight" style="display: inline;">
          </div>

          <h3 class="ui header grey" style="display: inline;">
            <div class="ui simple dropdown">
              {{weight.type}}<i class="dropdown icon" style="margin-left: 3px;"></i>
              <div class="menu">
                <div @click="weight.type = 'KG'" class="item">KG</div>
                <div @click="weight.type = 'LBS'" class="item">LBS</div>
              </div>
            </div>
          </h3>

        </div>
      </div>
    </div>

    <div class="ui divider hidden"></div>

    <h4 class="ui header">2. What is your fitness experience?
    </h4>
    <div class="ui buttons four choose-experience">
      <button class="ui green button" :class="{basic: chosenExperience !== 'untrained'}"
              @click="chosenExperience = 'untrained'">Untrained
      </button>
      <button class="ui button yellow" :class="{basic: chosenExperience !== 'beginner'}"
              @click="chosenExperience = 'beginner'">Beginner
      </button>
      <button class="ui orange button" :class="{basic: chosenExperience !== 'advanced'}"
              @click="chosenExperience = 'advanced'">Advanced
      </button>
      <button class="ui button red" :class="{basic: chosenExperience !== 'expert'}"
              @click="chosenExperience = 'expert'">Expert
      </button>
    </div>

    <div class="ui divider hidden"></div>

    <!--todo: check on mobile-->
    <h4 class="ui header">
      3. What days in the week you can train?
    </h4>
    <div class="ui buttons seven choose-week-days">
      <div class="ui button blue" :class="{basic: !chosenDays['monday']}" @click="toggleDay('monday')">M</div>
      <div class="ui button blue" :class="{basic: !chosenDays['tuesday']}" @click="toggleDay('tuesday')">T</div>
      <div class="ui button blue" :class="{basic: !chosenDays['wednesday']}" @click="toggleDay('wednesday')">W</div>
      <div class="ui button blue" :class="{basic: !chosenDays['thursday']}" @click="toggleDay('thursday')">T</div>
      <div class="ui button blue" :class="{basic: !chosenDays['friday']}" @click="toggleDay('friday')">F</div>
      <div class="ui button blue" :class="{basic: !chosenDays['saturday']}" @click="toggleDay('saturday')">S</div>
      <div class="ui button blue" :class="{basic: !chosenDays['sunday']}" @click="toggleDay('sunday')">S</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Stats',
    data() {
      return {
        weight: {
          value: null,
          type: 'KG'
        },
        height: {
          value: null,
          type: 'CM'
        },
        chosenExperience: '',
        chosenDays: {
          monday: 0,
          tuesday: 0,
          wednesday: 0,
          thursday: 0,
          friday: 0,
          saturday: 0,
          sunday: 0
        },
        maximumWeeklySets: null
      }
    },
    mounted() {
      $('.dropdown').dropdown();
    },


    methods: {

      toggleDay(day) {
        if (this.chosenDays[day]) {
          this.chosenDays[day] = 0;
        } else {
          this.chosenDays[day] = 1;
        }
      }

    }
  }
</script>
