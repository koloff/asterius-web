<template>
  <div class="ui card">

    <img class="image" src="/images/avatar/large/steve.jpg">

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