import request from 'superagent';
import authStore from '../store/auth';

async function get(path, query) {
  return new Promise((resolve, reject) => {
    request
      .get(`${apiUrl}/api${path}`)
      .query(query)
      .end((err, res) => {
        if (err) {
          return reject(res.body);
        }

        return resolve(res.body);
      });
  });
}

async function getAuthorized(path, query) {
  console.log('requestign');
  return new Promise((resolve, reject) => {
    let userIdToken = authStore.state.idToken;
    if (!userIdToken) {
      console.log('no token');
      return reject();
    }
    request
      .get(`${apiUrl}/api${path}`)
      .query(query)
      .set('X-Access-Token', userIdToken)
      .end((err, res) => {
        if (err) {
          return reject(res.body);
        }

        return resolve(res.body);
      });
  })
}

export default {get, getAuthorized};