'use strict';
const path = require('path');
const ejs = require('ejs');

const TEMPLATE = path.join(__dirname, 'response.ejs');

function renderResponseForUser(user) {
  const data = {
    metaDescription: user.bio,
    metaTitle: 'SLSSR - ' + user.first_name + ' ' + user.last_name,
    metaImg: user.avatar
  };

  return new Promise((resolve, reject) => {
    ejs.renderFile(TEMPLATE, data, (err, rendered) => err ? reject(err) : resolve(rendered));
  });
}

module.exports = {
  renderResponseForUser
};
