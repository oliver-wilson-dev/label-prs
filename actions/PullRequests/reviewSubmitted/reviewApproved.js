module.exports = ({
  checkIfLabelAlreadyExists,
  issues,
  labels: {
    numberOfApprovalsLabel,
    numberOfApprovalsMinusOneLabel,
  },
  owner,
  repo,
  issue_number,
}) => () => {
  if (checkIfLabelAlreadyExists({ label: numberOfApprovalsMinusOneLabel })) {
    issues.removeLabels({
      owner, repo, issue_number, labels: [numberOfApprovalsMinusOneLabel],
    });
  }

  if (!checkIfLabelAlreadyExists({ label: numberOfApprovalsLabel })) {
    issues.addLabels({
      owner, repo, issue_number, labels: [numberOfApprovalsLabel],
    });
  }
};
