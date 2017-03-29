import firebase from 'firebase';

import rootStore from './root';

export default {
  state: {
    uid: ''
  },


  async init() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.state.uid = user.uid;
          return resolve(true);
        } else {
          this.state.uid = '';
          return resolve(false);
        }
      });
    })
  },


  async login(email, password) {
    console.log(arguments);
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.state.uid = user.uid;
          return resolve(user);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },

  logout(){
    this.state.uid = '';
    firebase.auth().signOut();
  },

  async register(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.state.uid = user.uid;
          return resolve(user);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}