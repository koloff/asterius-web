<template>
  <div class="card">
    <div class="content">
      <div class="header">{{name}}</div>
      <div class="description">
        <div class="ui inverted segment">
          <div
            v-for="muscle in musclesUsed"
            :data-percent="muscle.percentage"
            class="ui inverted progress green small" style="margin: 7px 0 7px 0">
            <div class="bar">
              {{muscle.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Exercise',
    props: ['name', 'musclesUsed'],
    mounted() {
      $('.progress').progress({
        showActivity: false
      });
    }
  }
</script>