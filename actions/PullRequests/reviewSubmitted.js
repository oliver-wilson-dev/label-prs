const { labels } = require('./constants');

const { DEV_APPROVALS: { keyPrefix } } = labels;

module.exports = async (context) => {
  const {
    payload: {
      review,
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

  const { data: reviews } = await pullRequests.listReviews({ owner, repo, number });

  const numberOfApprovals = [...new Set(
    reviews
      .filter(({ state: reviewState }) => reviewState === 'APPROVED')
      .map(({ user: { login } }) => login),
  )].length;

  if (review.state === 'changes_requested') {
    if (numberOfApprovals > 0) {
      issues.removeLabels(context.issue({
        labels: [labels.DEV_APPROVALS[`${keyPrefix}${numberOfApprovals}`]],
      }));

      issues.addLabels(context.issue({
        labels: [labels.DEV_APPROVALS[`${keyPrefix}${numberOfApprovals - 1}`]],
      }));
    }
  }

  if (review.state === 'approved') {
    issues.removeLabels(context.issue({
      labels: [labels.DEV_APPROVALS[`${keyPrefix}${numberOfApprovals - 1}`]],
    }));

    issues.addLabels(context.issue({
      labels: [labels.DEV_APPROVALS[`${keyPrefix}${numberOfApprovals}`]],
    }));
  }
};
