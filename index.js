const open = require('./actions/PullRequests/open')
const reviewSubmitted = require('./actions/PullRequests/reviewSubmitted')

module.exports = app => {
  app.log('Yay, the app was loaded!')

  app.on('pull_request.opened', open)

  // Running app when Pull Request Review is submitted
  app.on('pull_request_review.submitted', reviewSubmitted)

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
