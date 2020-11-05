const getConfig = require('./getConfig');
const addLabelsToRepo = require('./addLabelsToRepo');
const { labels } = require('./constants');

const { APPROVALS: { keyPrefix } } = labels;
const generateLabelName = ({ index }) => labels.APPROVALS[`${keyPrefix}${index}`];

module.exports = async (context) => {
  const {
    payload: {
      pull_request: {
        number: issue_number,
        user: {
          login,
        },
        head: {
          ref: branchName,
        },
      },
    },
    github,
  } = context;

  const { owner, repo } = context.repo();

  const {
    labels: {
      allApprovalsColour = '008000',
      approvalColour = '0770CF',
      noOfApprovalsRequired = 2,
    },
  } = await getConfig({
    branchName,
    github,
    owner,
    repo,
  });

  const APPROVALS_0 = { name: generateLabelName({ index: 0 }), color: 'DDDDDD' };

  await addLabelsToRepo({
    allApprovalsColour,
    approvalColour,
    generateLabelName,
    github,
    labelsToMake: [APPROVALS_0],
    noOfApprovalsRequired,
    owner,
    repo,
  });

  github.issues.addLabels({
    issue_number,
    owner,
    repo,
    labels: [APPROVALS_0],
  });

  github.issues.addAssignees({
    owner,
    repo,
    issue_number,
    assignees: [login],
  });
};
