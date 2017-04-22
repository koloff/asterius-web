import http from '../http/http';

export default {
  state: {
    mc: null
  },

  async init() {
    if (!this.state.mc) {
      (async() => {
        try {
          this.state.mc = await http.get('/muscles/collection');
        } catch (err) {
          console.error(err);
        }
      })();
    }
  },

  getMuscle(key) {
    return _.find(this.state.mc.muscles, function(muscle) {
      return muscle.key === key;
    });
  }
}