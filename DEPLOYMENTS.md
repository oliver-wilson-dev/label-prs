# Deployments

> The following steps detail how this app is deployed.

## App settings

A contributor of the [github repository that hosts this app](https://github.com/oliver-wilson-dev/label-prs) will be able to configure the app via `https://github.com/settings/apps/label-prs`.

There are some notable properties that need to be configured:
> Webhook URL - this needs to point to wherever the app is hosted so that when a webhook event is triggered by github, it can listen to that event and respond accordingly e.g. add a label to a PR.

> Webhook Secret (optional) - this value is optional, but you should use it for reasons detailed [here](https://developer.github.com/webhooks/securing/).

> Private key - the private key is used to authenticate the probot app when it tries to perform actions in github.

## To deploy new changes

Deploying new changes to the app means that you should push changes to the github repo and then once these changes have been pushed, import the github repo from Glitch. It is **important** to remember to copy the contents of the `.env` file and the `./data/private-key.pem` file as these will be overridden when importing the project from github.

    The values in here are:
    `APP_ID` - the registered ID of the app (`APP_ID`).
    `WEBHOOK_SECRET` - the same webhook secret mentioned under the `App settings` section of this document. 
    `PRIVATE_KEY_PATH` - the path to the private key needed to authenticate with github.
    `NODE_ENV` - the node environment the app should be running in.

Once you have imported the project from github into glitch, override the `.env` file to be the contents of the previous `.env` file that you copied before and add a `private-key.pem` in a directory called `./data/` file with the contents that you copied before.

If you've forgot to copy these values, you can always generate a new one in the app's settings in github when you install the app.
