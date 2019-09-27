const { labels } = require('../constants');
const reviewApproved = require('./reviewApproved');
const changesRequested = require('./changesRequested');
const getReviewTypes = require('./getReviewTypes');
const checkIfLabelAlreadyExists = require('./checkIfLabelAlreadyExists');
const getNumberOfApprovals = require('./getNumberOfApprovals');

const { DEV_APPROVALS: { keyPrefix } } = labels;

module.exports = async (context) => {
  const {
    payload: {
      review: {
        state: reviewState,
      },
      pull_request: {
        number,
      },
      repository: {
        name: repo,
        owner: {
          login: owner,
        },
      },
    },
    github: {
      pullRequests,
      issues,
    },
  } = context;


  const numberOfApprovals = await getNumberOfApprovals({
    pullRequests, owner, repo, number,
  });

  const numberOfApprovalsLabel = labels.DEV_APPROVALS[`${keyPrefix}${numberOfApprovals}`];
  const numberOfApprovalsMinusOneLabel = labels.DEV_APPROVALS[`${keyPrefix}${numberOfApprovals - 1}`];

  console.log('labels: ', numberOfApprovalsLabel, numberOfApprovalsMinusOneLabel);


  const checkIfLabelAlreadyExistsCallback = await checkIfLabelAlreadyExists({
    issues, owner, repo, number,
  });

  const reviewTypeCallbackParams = {
    checkIfLabelAlreadyExists: checkIfLabelAlreadyExistsCallback,
    context,
    issues,
    labels: {
      numberOfApprovalsLabel,
      numberOfApprovalsMinusOneLabel,
    },
  };

  const reviewTypes = getReviewTypes({
    changesRequested: changesRequested({
      ...reviewTypeCallbackParams,
      numberOfApprovals,
    }),
    reviewApproved: reviewApproved({ ...reviewTypeCallbackParams }),
  });

  if (reviewState in reviewTypes) reviewTypes[reviewState]();
};
