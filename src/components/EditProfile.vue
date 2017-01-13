<template>
  <div>

    <div class="ui divider hidden"></div>
    <h2 class="ui icon header inverted center aligned margin-bottom">
      <i class="trophy icon"></i>
      <div class="content">
        Personalisation
        <div class="sub header">Answer these questions for optimal program</div>
      </div>
    </h2>

    <div class="ui steps tablet stackable fluid">
      <div @click="currentView = 'personalMetrics'" class="link step"
           :class="{active: currentView === 'personalMetrics'}">
        <i class="child icon"></i>
        <div class="content">
          <div class="title">Personal metrics</div>
          <div class="description">Age, gender, metrics and experience</div>
        </div>
      </div>
      <div @click="currentView = 'workoutInfo'" class="link step" :class="{active: currentView === 'workoutInfo'}">
        <i class="calendar icon"></i>
        <div class="content">
          <div class="title">Workout info</div>
          <div class="description">How much and what days can you train?</div>
        </div>
      </div>
      <div @click="currentView = 'finish'" class="link step" :class="{active: currentView === 'finish'}">
        <i class="options icon"></i>
        <div class="content">
          <div class="title">Finish</div>
          <div class="description">Generate and tweak your program</div>
        </div>
      </div>
    </div>


    <transition
      mode="out-in"
      name="custom-classes-transition"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutRight"
      v-on:after-enter="initPlugins()"
    >
      <div v-if="currentView === 'personalMetrics'" key="'personalMetrics'" class="ui segment basic">
        <div class="ui segment basic">
          <h2 class="ui header inverted ">
            Gender
          </h2>

          <h2 class="ui header">
            <div class="ui radio checkbox inverted">
              <input type="radio" name="frequency" checked="checked">
              <label style="color: white"><i class="ui icon male"></i>Male</label>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="ui radio checkbox">
              <input type="radio" name="frequency" checked="checked">
              <label style="color: white"><i class="ui icon female"> </i>Female</label>
            </div>
          </h2>
        </div>


        <div class="ui segment basic">
          <h2 class="ui header inverted ">
            Metrics
          </h2>

          <form class="ui form">
            <div class="fields">
              <div class="three wide field">
                <label style="color: white">AGE</label>
                <input type="text" placeholder="years">
              </div>
              <div class="three wide field">
                <label style="color: white">HEIGHT</label>
                <input type="text" placeholder="cm">
              </div>
              <div class="three wide field">
                <label style="color: white">WEIGHT</label>
                <input type="text" placeholder="kg">
              </div>

            </div>
          </form>
        </div>


        <div class="ui segment basic">
          <h2 class="ui header inverted ">
            Fitness experience
          </h2>

          <div class="ui grid">
            <div class="column five wide center aligned">
              <div class="ui segment">
                <div class="ui olive label">Untrained</div>
                <div class="ui huge star rating"></div>
                <div class="ui red label">Advanced</div>
              </div>
            </div>
          </div>

          <div class="ui divider hidden"></div>
          <div class="ui divider"></div>

          <button @click="currentView = 'workoutInfo'" class="ui centered aligned big button primary">
            Next <i class="ui icon angle double right"></i>
          </button>
        </div>

      </div>

      <div v-if="currentView === 'workoutInfo'" key="'workoutInfo'" class="ui segment basic">

        <div class="ui divider hidden margin-bottom"></div>
        <div class="ui grid ">
          <div class="ui column twelve wide">
            <h4 class="ui header inverted">
              Which days can you train
              <div class="sub header">The more - the better. Also try to spread them evenly through .</div>
            </h4>
            <div class="ui buttons equal fluid">
              <div :class="{active: chosenDays['monday']}" @click="toggleDay('monday')"
                   class="ui basic inverted button blue ">
                Monday
              </div>
              <br>
              <div :class="{active: chosenDays['tuesday']}" @click="toggleDay('tuesday')"
                   class="ui basic inverted button blue ">
                Tuesday
              </div>
              <br>
              <div :class="{active: chosenDays['wednesday']}" @click="toggleDay('wednesday')"
                   class="ui basic inverted button blue ">Wednesday
              </div>
              <br>
              <div :class="{active: chosenDays['thursday']}" @click="toggleDay('thursday')"
                   class="ui basic inverted button blue ">Thursday
              </div>
              <br>
              <div :class="{active: chosenDays['friday']}" @click="toggleDay('friday')"
                   class="ui basic inverted button blue ">
                Friday
              </div>
              <br>
              <div :class="{active: chosenDays['saturday']}" @click="toggleDay('saturday')"
                   class="ui basic inverted button blue ">Saturday
              </div>
              <br>
              <div :class="{active: chosenDays['sunday']}" @click="toggleDay('sunday')"
                   class="ui basic inverted button blue ">
                Sunday
              </div>
            </div>
          </div>
          <div class="column twelve wide">
            <h4 class="ui header inverted">
              How much time can you spend training
              <div class="sub header">15 minutes in the beginning you warm up and stretch. Try not to work out more than
                90 minutes.
              </div>
            </h4>
            <div class="ui segment">
              <div class="ui range blue" id="my-range"></div>
            </div>
          </div>
          <div class="column three wide center middle aligned">
            <br>
            <div class="ui column four wide">
              <h1 class="ui header inverted">{{sessionMinutes}}
                <div class="sub header">MINUTES</div>
              </h1>
            </div>

          </div>
        </div>

        <div class="ui divider hidden"></div>
        <div class="ui divider "></div>
        <button @click="currentView = 'finish'" class="ui centered aligned big button primary">
          Next <i class="ui icon angle double right"></i>
        </button>
      </div>

      <div v-if="currentView === 'finish'" key="'finish'" class="ui segment basic">
        <div class="ui divider hidden margin-bottom"></div>
        <h3 class="ui header inverted">
          You are almost done
          <div class="sub header">Now the system is going to generate your workout. You can tweak it based on your
            favourite muscles and exercises.
          </div>
        </h3>
        <div class="ui  divider "></div>

        <router-link tag="button" :to="'/tweaker'" class="ui icon big button primary">
          <i class="ui icon flag checkered"></i> Final touches
        </router-link >
      </div>


    </transition>

  </div>
</template>

<script>
  export default {
    name: 'EditProfile',
    data() {
      return {
        currentView: 'personalMetrics',
        animationEnded: true,
        chosenDays: {
          monday: 1,
          tuesday: 0,
          wednesday: 1,
          thursday: 0,
          friday: 1,
          saturday: 0,
          sunday: 0
        },
        sessionMinutes: 70,
        maximumWeeklySets: null
      }
    },
    mounted() {
      this.initPlugins();
    },


    methods: {
      initPlugins() {
        $('#my-range').range({
          min: 30,
          max: 120,
          start: 80,
          onChange: (val) => {
            this.sessionMinutes = val;
          }
        });

        $('.rating').rating({
          initialRating: self.trainingLevel,
          maxRating: 5,
          onRate: (value) => {
            this.trainingLevel = value;
          }
        })

      },
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
      },

    }
  }
</script>
