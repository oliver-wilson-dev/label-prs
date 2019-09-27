module.exports = ({
  checkIfLabelAlreadyExists,
  context,
  issues,
  numberOfApprovals,
  labels: {
    numberOfApprovalsLabel,
    numberOfApprovalsMinusOneLabel,
  },
}) => () => {
  if (numberOfApprovals > 0) {
    if (checkIfLabelAlreadyExists({ label: numberOfApprovalsLabel })) {
      issues.removeLabels(context.issue({
        labels: [numberOfApprovalsLabel],
      }));
    }

    if (!checkIfLabelAlreadyExists({ label: numberOfApprovalsMinusOneLabel })) {
      issues.addLabels(context.issue({
        labels: [numberOfApprovalsMinusOneLabel],
      }));
    }
  }
};
