module.exports = ({
  checkIfLabelAlreadyExists,
  issues,
  context,
  labels,
}) => () => {
  console.log('fuck off', labels.numberOfApprovalsLabel, labels.numberOfApprovalsMinusOneLabel);
  context.log(
    checkIfLabelAlreadyExists,
    labels.numberOfApprovalsLabel,
    labels.numberOfApprovalsMinusOneLabel,
  );

  if (checkIfLabelAlreadyExists({ label: labels.numberOfApprovalsMinusOneLabel })) {
    issues.removeLabels(context.issue({
      labels: [labels.numberOfApprovalsMinusOneLabel],
    }));
  }

  if (!checkIfLabelAlreadyExists({ label: labels.numberOfApprovalsLabel })) {
    issues.addLabels(context.issue({
      labels: [labels.numberOfApprovalsLabel],
    }));
  }
};
