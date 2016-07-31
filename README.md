# resume

Personal resume

* [Installing locally](#installing-locally)
* [Scripts](#scripts)
  * [`npm run dev`](#npm-run-dev)
  * [`npm run build`](#npm-run-build)
  * [`npm run serve`](#npm-run-serve)
  * [`npm run deploy`](#npm-run-deploy)

## Installing locally

Once you have your repository cloned to your local computer, just run the following command to install the dependencies:

```
npm install
```

## Scripts

This package ships with a few handy scripts to automate development and deployment of the website.

### `npm run dev`

This command starts a Webpack "hot" server, which watches your source files for changes and automatically recompiles and reloads your browser. Simply run this command, wait for compiling to finish, and visit http://localhost:8080 in your browser.

### `npm run build`

This command executes a production-like build from your source files using Webpack. It compiles and concatenates your sources into files that are stored in `./build` in your repository. All of your static assets should now be safely contained within the `./build` directory and you can serve your static website using a standard web server from the `./build` directory.

### `npm run serve`

This command runs a static HTTP server for the `build/` directory generated via `npm run build`. This is a simulation of a production environment.

### `npm run deploy`

Running this script for the first time will create a branch called `gh-pages`, which is the branch that serves the static website using GitHub Pages.

This command simply runs the top-level bash script file called `deploy.sh`. The bash script does the following:

1. Clones your website repository into a directory called `./out` and checks out a special branch called `gh-pages`. (The branch is created if it does not exist.)
1. Deletes all contents of the `./build` directory.
1. Runs [`npm run build`](#npm-run-build) and copies the results (everything in `./build`) into the root of the `gh-pages` branch clone.
1. If there are any changes from the previous build, commits and pushes the changes to the `gh-pages` branch clone.
