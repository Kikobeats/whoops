var Errorifier = require('./index.js');

throw new Errorifier({
  code: 'NotEnoughTweets',
  message: 'We need moar tweets.',
  errno: 127
});
