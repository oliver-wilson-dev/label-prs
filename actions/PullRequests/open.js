const { labels } = require('./constants');

const { DEV_APPROVALS: { keyPrefix } } = labels;
const DEV_APPROVALS_0 = labels.DEV_APPROVALS[`${keyPrefix}${0}`];
const DEV_APPROVALS_1 = labels.DEV_APPROVALS[`${keyPrefix}${1}`];
const DEV_APPROVALS_2 = labels.DEV_APPROVALS[`${keyPrefix}${2}`];

module.exports = async (context) => {
  const {
    payload: {
      pull_request: {
        number: issue_number,
      },
    },
    github,
  } = context;

  const { owner, repo } = context.repo();

  const { data: existingLabels } = await github.issues.listLabelsForRepo({
    owner,
    repo,
  });

  [
    { name: DEV_APPROVALS_0, color: 'DDDDDD' },
    { name: DEV_APPROVALS_1, color: '0770CF' },
    { name: DEV_APPROVALS_2, color: '008000' },
  ].forEach((label) => {
    const checkIfLabelAlreadyExists = existingLabels.some(
      ({ name: existingLabelName }) => existingLabelName === label.name,
    );

    if (!checkIfLabelAlreadyExists) {
      github.issues.createLabel({
        ...label,
        owner,
        repo,
      });
    }
  });


  github.issues.addLabels({
    issue_number,
    owner,
    repo,
    labels: [DEV_APPROVALS_0],
  });
};
