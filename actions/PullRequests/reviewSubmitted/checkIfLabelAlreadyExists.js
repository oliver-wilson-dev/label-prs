module.exports = async ({
  issues, owner, repo, issue_number,
}) => {
  const { data: existingLabels } = await issues.listLabelsOnIssue({
    owner,
    repo,
    issue_number,
  });

  return ({ label }) => existingLabels.some(
    ({ name: existingLabelName }) => existingLabelName === label,
  );
};
