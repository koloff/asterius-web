<template>
  <div>

    <div class="ui segment basic center aligned" style="margin-top: 60px;">
      <h2 class="ui header inverted">

        {{Date.now() | date | uppercase}}
        <div class="ui inverted sub header">
          CHOOSE WORKOUT FOR TODAY:
        </div>
      </h2>

      <div class="ui large buttons inverted">
        <button class="ui button primary">A</button>
        <button class="ui button primary">B</button>
        <button class="ui button primary">C</button>
        <div class="or inverted basic"></div>
        <button class="ui button green">CUSTOM</button>
      </div>
    </div>


  </div>
</template>

<script>
  import splitStore from '../../store/split';

  export default {
    name: 'Program',
    data() {
      return {
        splitState: splitStore.state
      }
    }
  }
</script>