module.exports = async ({
  pullRequests, owner, repo, number,
}) => {
  const { data: reviews } = await pullRequests.listReviews({ owner, repo, number });

  return [...new Set(
    reviews
      .filter(({ state }) => state === 'APPROVED')
      .map(({ user: { login } }) => login),
  )].length;
};
