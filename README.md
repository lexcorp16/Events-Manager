### status
[![Build Status](https://travis-ci.org/Efosaok/Events-Manager.svg?branch=develop)](https://travis-ci.org/Efosaok/Events-Manager) [![Coverage Status](https://coveralls.io/repos/github/Efosaok/Events-Manager/badge.svg?branch=develop)](https://coveralls.io/github/Efosaok/Events-Manager?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/85bfcc4c242d38ff6312/maintainability)](https://codeclimate.com/github/Efosaok/Events-Manager/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/85bfcc4c242d38ff6312/test_coverage)](https://codeclimate.com/github/Efosaok/Events-Manager/test_coverage)

# Events-Manager
Events Manager is a web app that helps you manage an event-center.
Given you manage an events center, this app will help you accept applications to use your center / facilities,It contains
features like notifying users of event cancellation via email notification.
Get a feel of the app [here](https://events-manager-efosa.herokuapp.com/)

### Prerequisites/System Dependencies

To get a working version of this app locally, You would need  the following

```
Node.js

PostgresQl
```

### Installing this app locally
Clone this repository

git clone https://github.com/Efosaok/Events-Manager

cd into cloned directory  cd Events-manager

run npm install to install all necessary dependencies

create a .env file and setup all environment variables as listed in the `.env.example` file

## Running the tests
This app is built with the concept of TDD, The tests were written with the Mocha framework.

To get the tests to run locally:

```
$ npm run localtest
```

That would also give you a local coverage report from coveralls.

### Coding Style

This app was built was built with strict adherence to airbnb style guide

For complete eslint rule configuration, see the .eslintrc.json file

## Deployment

Below are links to resources on how to deploy this Node.js app on different hosting services;

* [AWS](https://aws.amazon.com/getting-started/projects/deploy-nodejs-web-app/)
* [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
* [Nodejitsu](https://blog.codeship.com/node-js-deployment-github-nodejitsu/)

## Built With

* [Node.js](https://nodejs.org) - The server side web framework.
* [PostgreSQL](https://postgresql.org) - database
* [Sequelize](http://docs.sequelizejs.com/manual/tutorial/models-usage.html) database ORM
* [React.js](https://reactjs.org) - Client side library
* [Redux](https://redux.js.org) - App state management framework

## Contributing

Please read the CONTRIBUTING.md for details on code of conduct, and the process for submitting pull requests to us.


## Authors

Efosa Okpugie

## Acknowledgments

* Andela Cohort 34 members
* Andela Bootcamp LFA's
* Simulations LFA - Mark Edomwande
