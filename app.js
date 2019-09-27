const { toLambda } = require('probot-serverless-now');

const applicationFunction = require('./index');

module.exports = toLambda(applicationFunction);
