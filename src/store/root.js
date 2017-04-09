import musclesStore from './muscles';
import exercisesStore from './exercises';
import userParametersStore from './user-parameters';
import preferredMusclesStore from './preferred-muscles';
import splitStore from './split';

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
      splitStore.init()
    ])
  },

  resetProfileRelatedStores() {
    userParametersStore.setDefaultState();
    preferredMusclesStore.setDefaultState();
    splitStore.setDefaultState()
  },

  setLoading(value){
    this.state.loading = value;
  }
}