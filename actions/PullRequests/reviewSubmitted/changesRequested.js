module.exports = ({
  checkIfLabelAlreadyExists,
  issues,
  numberOfApprovals,
  labels: {
    numberOfApprovalsLabel,
    numberOfApprovalsMinusOneLabel,
  },
  owner,
  repo,
  issue_number,
}) => () => {
  if (numberOfApprovals > 0) {
    if (checkIfLabelAlreadyExists({ label: numberOfApprovalsLabel })) {
      issues.removeLabels({
        owner, repo, issue_number, labels: [numberOfApprovalsLabel],
      });
    }

    if (!checkIfLabelAlreadyExists({ label: numberOfApprovalsMinusOneLabel })) {
      issues.addLabels({
        owner, repo, issue_number, labels: [numberOfApprovalsMinusOneLabel],
      });
    }
  }
};
