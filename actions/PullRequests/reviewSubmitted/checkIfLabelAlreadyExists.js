module.exports = async ({
  issues, owner, repo, number,
}) => {
  const { data: existingLabels } = await issues.listLabelsOnIssue({
    owner,
    repo,
    number,
  });

  return ({ label }) => existingLabels.some(
    ({ name: existingLabelName }) => existingLabelName === label,
  );
};
