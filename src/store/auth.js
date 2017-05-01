import _ from 'lodash';
import firebase from 'firebase';
import rootStore from './root';

export default {
  state: {
    uid: '',
    idToken: ''
  },

  setDefaultState() {
    this.state.uid = '';
    this.state.idToken = '';
  },

  async init(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          await rootStore.initCollectionStores();
          firebase.auth().currentUser.getToken(/* forceRefresh */ true).then((idToken) => {
            this.state.uid = user.uid;
            this.state.idToken = idToken;
            return resolve(true);
          }).catch((error) => {
            return reject(false);
          });
        } else {
          return resolve(false);
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
    firebase.auth().signOut().then(() => {
      this.setDefaultState();
    });
  },

  async register(email, password){
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