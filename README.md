# Holista Therapy UI with React

A UI application for the Holista Therapy project, bootstrapped with [Vite](https://vitejs.dev/) following React TS template. 


## Prerequisites

- Node.js v18.15.0 or higher
- npm v9.5.0 or higher
- ESLint and Prettier extensions in your code editor of choice


## Getting Started

Instructions on how to install, configure and run the project.

1. Clone the repository.
2. Make sure, you have the correct version of node and npm installed in your system. The versions are specified in the `engines` in package.json.  
We recommend using [nvm](https://github.com/nvm-sh/nvm) for switching node versions. If you have nvm installed on your system, you can make use of `nvm use` command to switch the correct node version. It'll read the version set in `.nvmrc` file. (Note: `nvm use` cmd does not work on a windows machine. You may need to do it manually with `nvm use <version>`)
3. Install the dependencies with `npm install`.
4. Configure the environment variables.
5. Start the server with `npm run dev`.


## Environments

Create a folder named `environments` in the root directory. All the env files are to be kept inside this folder.

To run the app locally pointing local API server, copy the contents from `.env.sample` file into a new file `env.localdev` (placed inside `/environments`) and fill the values (Get the values from your peer devs) and run the following command.

`npm run localdev`

Similarly, to run the app locally pointing DEV server, you need to populate `.env.dev` file and run the following command.

`npm run dev`.

This app supports five enviroments: local, dev, qa, uat and prod. 

Building the app:  
`npm run build:dev` -> builds the app for DEV env (.env.dev)  
`npm run build:qa` -> builds the app for QA env (.env.qa)  
`npm run build:uat` -> builds the app for UAT env (.env.uat)  
`npm run build:prod` -> builds the app for PROD env (.env.prod)  
