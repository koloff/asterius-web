import musclesStore from './muscles';
import exercisesStore from './exercises';

import userParametersStore from './user-parameters';
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


  resetProfileRelatedStores() {
    userParametersStore.setDefaultState();
    splitStore.setDefaultState()
  },

  setLoading(value){
    this.state.loading = value;
  }
}