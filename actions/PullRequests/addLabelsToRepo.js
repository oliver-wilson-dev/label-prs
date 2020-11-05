module.exports = async ({
  allApprovalsColour,
  approvalColour,
  generateLabelName,
  github,
  labelsToMake,
  noOfApprovalsRequired,
  owner,
  repo,
}) => {
  const { data: existingLabels } = await github.issues.listLabelsForRepo({
    owner,
    repo,
  });

  for (let index = 1; index < noOfApprovalsRequired; index += 1) {
    labelsToMake.push({ name: generateLabelName({ index }), color: approvalColour });
  }

  labelsToMake.push({
    name: generateLabelName({ index: noOfApprovalsRequired }),
    color: allApprovalsColour,
  });

  labelsToMake.push({
    name: 'QA Sign Off',
    color: 'FF9C32',
  });

  labelsToMake.forEach((label) => {
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
};
