<template>
  <div class="ui card">

    <div class="content">
      <div class="header">{{broName}}</div>
      <div class="meta">
        <i>{{name}}</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MuscleMiniInfo',
    props: ['name', 'bro-name']
  }
</script>