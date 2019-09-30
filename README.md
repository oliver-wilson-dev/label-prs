# label-prs 🤖

> A GitHub App built with [Probot](https://github.com/probot/probot) that adds labels to PRs based on the approvals

### Motivation
Adding labels to pull requests makes it easier to view the status of a pull requests when looking at the pull request summaries page for a repository.

### When a pull request is opened
The bot assigns the user that opened the pull request to the pull request.

Three labels are added to the project (`Dev Approvals: 0`, `Dev Approvals: 1`, `Dev Approvals: 2`).

The `Dev Approvals: 0` label is automatically added to the PR.

### When a pull request is approved
Adds a label to represent the number of approvals the PR has.

### When a reviewer that approved the PR then requests changes
The label reflecting the number of approvals in the PR will be removed and replaced with a new label representing the new number of approvals on the PR. 

### Future features
**External configuration** - At the moment, this bot only works with three labels, it would be nicer if this could be configurable by some `yaml` or `json` configuration in a repository which could be read by this bot and labels could be changed according to the preference of the maintainer team of a given repository.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Contributing

If you have suggestions for how label-prs could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

## Deployment and Hosting
The app is hosted at `https://glitch.com/~label-prs` which is directly coupled to the repo of this project, so it inherits all changes.

## License

[ISC](LICENSE) © 2019 oliver wilson <contact@oliverwilson.dev> (www.oliverwilson.dev)
