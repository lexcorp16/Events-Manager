### status
[![Build Status](https://travis-ci.org/Efosaok/Events-Manager.svg?branch=develop)](https://travis-ci.org/Efosaok/Events-Manager) [![Coverage Status](https://coveralls.io/repos/github/Efosaok/Events-Manager/badge.svg?branch=develop)](https://coveralls.io/github/Efosaok/Events-Manager?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/85bfcc4c242d38ff6312/maintainability)](https://codeclimate.com/github/Efosaok/Events-Manager/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/85bfcc4c242d38ff6312/test_coverage)](https://codeclimate.com/github/Efosaok/Events-Manager/test_coverage)

# Events-Manager
Events Manager is a web app that helps you manage an event-center.
Given you manage an events center, this app will help you accept applications to use your center / facilities, and will either decline events when the proposed day is already taken, or suggest an available day.

### Prerequisites

To get a working version of this app locally, You would need  the following

```
Node.js

PostgresQl
```

### Installing
Clone this repository
```
git clone https://github.com/Efosaok/Events-Manager

cd into cloned directory  cd Events-manager

run npm install to install all necessary dependencies

create a .env file and setup all environment variables as listed in the `.env.example` file
```

## Running the tests

After installing, run
```
npm run localtest
```

### Coding Style

This app was built was built with strict adherence to airbnb style guide

For complete eslint rule configuration, see the .eslintrc.json file

## Deployment

To deploy this app to heroku, simply push to another git remote branch and deploy from there,To 

refactor the start script, work on the Procfile

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

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Andela Cohort 34 members
* Andela Bootcamp LFA's
* Simulations LFA - Mark Edomwande

## Live version
Live version of app hosted on heroku
[here](https://events-manager-efosa.herokuapp.com/)
