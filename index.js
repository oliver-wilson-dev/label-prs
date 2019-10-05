const open = require('./actions/PullRequests/open');
const reviewSubmitted = require('./actions/PullRequests/reviewSubmitted');

module.exports = (app) => {
  app.on('pull_request.opened', open);

  app.on('pull_request_review.submitted', reviewSubmitted);
};
