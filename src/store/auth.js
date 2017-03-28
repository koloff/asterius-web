import firebase from 'firebase';

export default {
  state: {
    uid: ''
  },


  init() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.state.uid = user.uid;
      } else {
        this.state.uid = '';
      }
    });
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