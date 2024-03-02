<div><img style="width:20%;height:20%" src='https://raw.githubusercontent.com/prafaelmsantos/auto-moreira-app/main/src/images/logo.png'/></div>

<h2>About the project</h2>

  <p><b>Auto Moreira Admin App</b> is an online platform that allows users to rent cars for personal or business use. The website provides an easy-to-use interface for searching, comparing, and reserving cars from a wide selection of vehicles that vary in make, model, size, and price.</p>

👉 Live Demo: <a href='https://auto-moreira-admin-app.onrender.com/'>Live Demo</a>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Generate GraphQL Types

Just follow the following steps:

0. (Not mandatory) From time to time update graphql-schema.graphql with the following command:
   `rover graph introspect https://automoreiraapi.onrender.com/graphql > graphql-schema.graphql`
1. Create a new query file (use existing queries as examples) inside _src/Queries_.
2. The following packages must be installed as global ex: "npm install -g apollo":
   2.1. Apollo;
   2.2. GraphQL;
   2.3 rover CLI = > run the command npm install -g @apollo/rover
   2.4 run npm install -g apollo
3. Run `npx apollo codegen:generate --localSchemaFile=graphql-schema.graphql --target=typescript --includes=src/**/*.ts --tagName=gql --addTypename --globalTypesFile=src/models/graphQL/graphql-global-types.ts types` (_don't forget to use_ `noglob`_for shells like zsh that consume wildcard symbols_).
4. All done !
