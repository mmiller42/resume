# Webpack Site Starter

This is a base repository from CodeCola designed to be forked in order to create a static website compiled from Webpack. It includes a the proper .gitignore file to exclude development and local assets and deploy scripts to automate pushing code to a PHP production environment.

* [Creating a repository](#creating-a-repository)
* [Installing locally](#installing-locally)
* [Installing on the server](#installing-on-the-server)
* [Setting up automatic deploy](#setting-up-automatic-deploy)
* [Scripts](#scripts)
  * [`npm run dev`](#npm-run-dev)
  * [`npm run build`](#npm-run-build)
  * [`npm run deploy`](#npm-run-deploy)

## Creating a repository

The first step is to "fork" the *[CodeColaLLC/webpack-site-starter](https://github.com/CodeColaLLC/webpack-site-starter)* repository for the particular client website you are working on. Forking within an organization cannot be done with the GitHub UI but it is easy enough to emulate by hand:

1. [Create a new, empty repository in the *CodeColaLLC* organization](https://github.com/organizations/CodeColaLLC/repositories/new). ❗ Don't add a readme, .gitignore, or license file. Name it after your client, e.g. *acmeco-website*.

1. On your local computer, clone the newly created repository, e.g.
  ```
  git clone https://github.com/CodeColaLLC/acmeco-website.git
  ```

1. Navigate into the cloned repository's directory, e.g.
  ```
  cd acmeco-website
  ```

1. Add the base Webpack site starter repository as an upstream source:
  ```
  git remote add upstream https://github.com/CodeColaLLC/webpack-site-starter.git
  ```

1. Finally, merge in the upstream repository's code with
  ```
  git pull upstream master
  ```

Now the repository is linked to the original starter repository and can be used normally. If changes are made to the starter repository that you want to sync with the client's instance, simply use `git pull upstream master` to merge in the changes again.

1. Open `./package.json` in an editor.
1. Change the `name` property to your project name, e.g.
  ```json
  "name": "acmeco-website",
  ```

1. Change the `repository.url` property to the URL of your Git repository, e.g.
  ```json
  "repository": {
    "type": "git",
    "url": "git+https://github.com/CodeColaLLC/acmeco-website.git"
  },
  ```

1. Change the `author` property if applicable, e.g.
  ```json
  "author": "John Galt <jgalt@twentiethcenturymotors.com> (https://twentiethcenturymotors.com)",
  ```

1. Commit and push your `./package.json` file to the master branch:
  ```
  git add ./package.json
  git commit -m 'Changing default package.json to acmeco-website details'
  git push
  ```

## Installing locally

Once you have your repository cloned to your local computer, just run the following command to install the dependencies:

```
npm install
```

## Installing on the server

In order to install the website on the client's web server, you will need SSH access to the server. Accessing SSH will vary depending on the hosting provider, and may require enabling in cPanel or an equivalent.

1. Run [the deploy script](#npm-run-deploy) to create and push a build.
  ```
  npm run deploy
  ```

1. SSH into the hosting web server for the client, e.g.
  ```
  ssh acmeco@acmeco.com
  ```

1. Once authenticated, make sure you are in the user's home directory.

1. Run an `ls` command, looking for the public root (such as *public_html*, *htdocs*, or *www*). Future examples will consider this directory to be called *public_html*. 

1. ❗ If **any** files exist in this public root directory, the next command will fail. Delete or move any existing files before running the next command.

1. Assuming Git is installed on the host, clone the client's website into the public root directory with
  ```
  git clone https://github.com/CodeColaLLC/acmeco-website.git public_html
  ```

1. Check out the `build` branch:
  ```
  git checkout origin/build
  git pull origin build
  ```

At this point, a running copy of the website will be installed on the server.

## Setting up automatic deploy

The last step is to configure the GitHub repository to trigger an automatic deployment whenever someone pushes to a configurable branch.

Whenever a deploy happens, an email is dispatched to the user who made the push, the user/team who owns the repository, and configurable additional email addresses. It will contain a brief message about the successful deployment or a message describing that an error occurred while attempting to `git pull`.

1. Navigate to the repository in GitHub, e.g. *acmeco-website*.

1. Click *Settings*, then *Webhooks & services*, then *Add webhook*.

1. In the *Payload URL* field, enter the path to the hosted website installation, followed by *deploy.php*, e.g. `http://acmeco.com/deploy.php`.

1. In the *Secret* field, choose a long, random, unpredictable token. You can generate one at a website like [this](http://randomkeygen.com/) (see the *Ft. Knox Passwords* section). Keep track of this "secret" for now, but ❗ don't store it anywhere permanently. (If it is lost, just generate a new one.)

1. Click *Add webhook*.

1. SSH into the client's web server.

1. Change into the public root directory or path to the website installation, e.g.
  ```
  cd public_html
  ```

1. Using your preferred editor, create a file named `.deployconfig.json`.
  ```
  vim .deployconfig.json
  ```

1. Craft a simple JSON object. The only required property is *token*, which should be set to the secret randomly generated string we attached to the GitHub Webhook earlier.
  ```json
  {
    "token": "1234567890abcdefg",
    "branch": "build"
  }
  ```

1. If you want to configure any email addresses to carbon copy deploy alerts, specify them as a comma-separated list in *cc*.
  ```json
  {
    "token": "1234567890abcdefg",
    "cc": "mymailroom@in.mailroom.hipch.at,importantperson@codecola.io",
    "branch": "build"
  }
  ```

1. Save the file.

Now we should be at a point where the deploy script will be executed every time anyone pushes to the build (or configured) branch. To try it, make a change to a file, then run [`npm run deploy`](#npm-run-deploy). It should automatically be reflected on the web host.

## Scripts

This package ships with a few handy scripts to automate development and deployment of the website.

### `npm run dev`

This command starts a Webpack "hot" server, which watches your source files for changes and automatically recompiles and reloads your browser. Simply run this command, wait for compiling to finish, and visit http://localhost:8080 in your browser.

### `npm run build`

This command executes a production-like build from your source files using Webpack. It compiles and concatenates your sources into files that are stored in `./public/build` in your repository. All of your static assets should now be safely contained within the `./public` directory and you can serve your static website using a standard web server from the `./public` directory.

### `npm run deploy`

Running this script for the first time will create a branch called `build`, which is necessary in order to complete [Setting up automatic deploy](#setting-up-automatic-deploy).

This command simply runs the top-level bash script file called `deploy.sh`. The bash script does the following:

1. Clones your website repository into a directory called `./out` and checks out a special branch called `build`. (The branch is created if it does not exist.)
1. Deletes all contents of the `build` directory.
1. Runs [`npm run build`](#npm-run-build) and copies the results (everything in `./public`) into the root of the `build` branch clone.
1. Copies `./deploy.php` into the root of the `build` branch clone.
1. If there are any changes from the previous build, commits and pushes the changes to the `build` branch clone.
1. If a GitHub webhook is configured, the push to the `build` branch will trigger the live server to pull updates.

The behavior can be changed by editing `./deploy.sh`. For example, if you have a minimal PHP API in a directory called API that should be copied into the build branch, change the constants near the top of the file like so:

```bash
SOURCE_DIRS=("./public" "./api")
DEST_DIRS=("./" "./api")
```

This says to copy the contents of `./public` to `./` and the contents of `./api` and to `./api`. Note that the file `./deploy.php` is always automatically copied.
