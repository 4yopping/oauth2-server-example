var vogels = require('vogels');

vogels.AWS.config.loadFromPath(__dirname + '/credentials.json');

module.exports = vogels;
