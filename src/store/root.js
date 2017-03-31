import musclesStore from './muscles';
import exercisesStore from './exercises';
import userParametersStore from './user-parameters';
import preferredMusclesStore from './preferred-muscles';
import selectedExercisesStore from './selected-exercises';

export default {
  state: {
    loading: false
  },

  async initCollectionStores() {
    return await Promise.all([
      musclesStore.init(),
      exercisesStore.init()
    ])
  },

  async initProfileRelatedStores(){
    console.log('init user related');
    return await Promise.all([
      userParametersStore.init(),
      preferredMusclesStore.init(),
      selectedExercisesStore.init()
    ])
  },

  resetProfileRelatedStores() {
    userParametersStore.setDefaultState();
    preferredMusclesStore.setDefaultState();
    selectedExercisesStore.setDefaultState();
  },

  setLoading(value){
    this.state.loading = value;
  }
}