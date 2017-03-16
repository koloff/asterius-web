export default {
  state: {
    loadingTweaker: false,
    loadingProfile: false
  },

  setLoadingTweaker(value) {
    this.state.loadingTweaker = value;
  },

  setLoadingProfile(value) {
    this.state.loadingProfile = value;
  }
}