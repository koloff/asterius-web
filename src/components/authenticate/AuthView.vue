<template>
  <div>
    <div class="ui divider hidden"></div>

    <div class="ui segment basic">
      <h2 class="ui center aligned header ">
        AUTHENTICATE
      </h2>
    </div>


    <div class="ui segment secondary">
      <div class="ui grid stackable">
        <div class="column seven wide">
          <login></login>
        </div>

        <div class="column two wide">
          <div class="ui vertical divider">OR</div>
        </div>

        <div class="right floated left aligned seven wide column">
          <register></register>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Login from './Login.vue';
  import Register from './Register.vue';
  export default {
    name: 'AuthView',
    components: {
      Login,
      Register
    }
  }
</script>