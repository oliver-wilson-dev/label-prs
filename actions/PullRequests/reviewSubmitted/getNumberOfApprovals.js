module.exports = async ({
  pullRequests, owner, repo, pullNumber,
}) => {
  const { data: reviews } = await pullRequests.listReviews({ owner, repo, pull_number: pullNumber });

  return [...new Set(
    reviews
      .filter(({ state }) => state === 'APPROVED')
      .map(({ user: { login } }) => login),
  )].length;
};
