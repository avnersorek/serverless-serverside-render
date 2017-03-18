'use strict';
const data = require('./MOCK_DATA.json'); // generated using https://www.mockaroo.com/

function getUser(id) {
  return data.find(user => user.id === id);
}

module.exports = {
  getUser
};
