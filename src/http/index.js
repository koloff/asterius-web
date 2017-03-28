import request from 'superagent';

window.apiUrl = 'http://localhost:3377';

export async function get(path, query) {
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