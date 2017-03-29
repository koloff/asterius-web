import userParametersStore from './user-parameters';
import preferredMusclesStore from './preferred-muscles';
import workoutStore from './workout';

export default {
  state: {
    loading: false
  },

  initProfileRelatedStores() {
    userParametersStore.init();
    preferredMusclesStore.init();
    workoutStore.init();
  },

  setLoading(value) {
    this.state.loading = value;
  }
}