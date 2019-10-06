const request = require('request-promise');

module.exports = async ({
  branchName,
  github,
  owner,
  repo,
}) => {
  try {
    const { data: { download_url } } = await github.repos.getContents({
      owner,
      path: '.github/config.json',
      ref: branchName,
      repo,
    });

    return JSON.parse(await request(download_url));
  } catch (error) {
    return {
      labels: {
        noOfApprovalsRequired: 2,
        approvalColour: '0770CF',
        allApprovalsColour: '008000',
      },
    };
  }
};
