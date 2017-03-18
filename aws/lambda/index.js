'use strict';
const isbot = require('isbot');
const backend = require('./backend/backend');
const responseGenerator = require('./responseGenerator/responseGenerator');

console.log('Loading function');

function handleBot(event, callback) {
  // this could be more complex route parsing
  const userId = parseInt(event.pathParameters.proxy);

  if (userId) {
    const user = backend.getUser(userId);
    responseGenerator.renderResponseForUser(user)
      .then(rendered => callback(null, { statusCode: '200', body: rendered }))
      .catch(err => callback(err));
  } else {
    callback(null, { statusCode: '400', body: 'Invalid user id', });
  }
}

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    var isRequestFromBot = isbot(event.headers['User-Agent'] || event.headers['user-agent']);

    if (isRequestFromBot) {
      handleBot(event, callback);
    } else {
      callback(null, {
          statusCode: '301',
          headers: {
            'Location': process.env.REDIRECT_LOCATION
          }
      });
    }
};
