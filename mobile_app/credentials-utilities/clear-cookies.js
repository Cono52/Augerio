// eslint-disable-next-line import/no-unresolved
const RCTNetworking = require('RCTNetworking');

function clearCookies() {
  return new Promise((success) => {
    RCTNetworking.clearCookies(success);
  });
}

export default clearCookies;
