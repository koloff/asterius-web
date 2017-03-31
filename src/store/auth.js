import _ from 'lodash';
import firebase from 'firebase';

import rootStore from './root';

export default {
  state: {
    uid: '',
    idToken: ''
  },

  setDefaultState() {
    this.state = {
      uid: '',
      idToken: ''
    };
  },

  async init(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(async(idToken) => {
            this.state.uid = user.uid;
            this.state.idToken = idToken;
            await Promise.all([
              rootStore.initCollectionStores(),
              rootStore.initProfileRelatedStores(),
            ]);
            return resolve();
          }).catch(function(error) {
            console.log(error);
            return reject(error);
          });
        } else {
          this.setDefaultState();
          return resolve();
        }
      });
    })
  },


  async login(email, password){
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          return resolve(user);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },

  logout() {
    firebase.auth().signOut();
  },

  async  register(email, password){
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          return resolve(user);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}