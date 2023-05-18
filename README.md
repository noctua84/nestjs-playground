[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub top language](https://img.shields.io/github/languages/top/noctua84/nestjs-playground)
![GitHub repo size](https://img.shields.io/github/repo-size/noctua84/nestjs-playground)
![Lines of code](https://img.shields.io/tokei/lines/github/noctua84/nestjs-playground)
![GitHub package.json version](https://img.shields.io/github/package-json/v/noctua84/nestjs-playground)
![GitHub last commit](https://img.shields.io/github/last-commit/noctua84/nestjs-playground)
[![CodeFactor](https://www.codefactor.io/repository/github/noctua84/nestjs-playground/badge)](https://www.codefactor.io/repository/github/noctua84/nestjs-playground)

# nestjs-playground
A playground repository to explore nestjs and add things overtime. See the README for more details.  
This project is ongoing and will certainly be highly overengineered.  
If you want to use this as source of inspiration or build something awesome with it, feel free to do so.
  
This project is designed as an API for a web applications or services.  
It is not designed to be a mono-repo for a fullstack application thus it does not contain any frontend code.

## Table of Contents
- [List of features](#list-of-features)
- [Tools used in this project (not part of the application)](#tools-used-in-this-project-not-part-of-the-application)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Test](#test)
- [Support](#support)
- [Issues](#issues)
- [License](#license)

## List of features
This is a list of features that are currently implemented or planned to be implemented in the future.  
This list is not complete and will be updated over time.  
Next to the feature there is a link to the npm package that is used to implement it.  
If there is no link, the feature is implemented without any external package.

- [ ] Logging with [winston](https://www.npmjs.com/package/winston)
- [ ] API-Documentation with [Swagger](https://www.npmjs.com/package/@nestjs/swagger)
- [ ] Authentication and Authorization with [Passport](https://www.npmjs.com/package/passport)
- [ ] Database
  - [ ] with [TypeORM](https://www.npmjs.com/package/typeorm)
  - [ ] with [Mongoose](https://www.npmjs.com/package/mongoose)
- [ ] Caching with [Redis](https://www.npmjs.com/package/redis)
- [ ] Testing with [Jest](https://www.npmjs.com/package/jest)
- [ ] CI/CD with [GitHub Actions](https://www.npmjs.com/package/github-actions)
- [ ] Deployment 
  - [ ] with [Docker](https://docker.com)
  - [ ] with [Kubernetes](https://www.kubernetes.io) and [Helm](https://helm.sh)
- [ ] Monitoring with [Prometheus](https://www.npmjs.com/package/prometheus)
- [ ] Error Handling
  - [ ] with [Sentry](https://www.npmjs.com/package/@sentry/node)
- [ ] Metrics with [Prometheus](https://www.npmjs.com/package/prom-client)
- [ ] Healthchecks with [Terminus](https://www.npmjs.com/package/@godaddy/terminus)
- [ ] Configuration with [@nestjs/config](https://www.npmjs.com/package/@nestjs/config)
- [ ] Config Validation with [Joi](https://www.npmjs.com/package/joi)

## Tools used in this project (not part of the application)
The tools listed here are not part of the application but are used to develop it, assist in maintaining it and to keep the code quality high.

- [Commitizen](https://www.npmjs.com/package/commitizen) with [cz-conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog)
- [SonarCloud](https://www.sonarcloud.io/) 
- [CodeFactor](https://www.codefactor.io/)
- [Dependabot](https://github.com/dependabot)
- [GitHub Actions](https://www.npmjs.com/package/github-actions)
- [CodeCov](https://codecov.io/)
- [CircleCI](https://circleci.com/)
- [Sentry](https://sentry.io/)

All of these tools are free to use for open source projects.  
But this list also aligns with my personal preferences and is not a recommendation to use these tools.  
In addition, there are many other tools that can be used to achieve the same results.  
This list is also aligned with the initial statement that this project might get highly overengineered, so there might be duplications in the list.  
These are on purpose though and are used to explore the tools and their capabilities.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
``` 
```bash
# watch mode
$ npm run start:dev
``` 
```bash
# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
``` 
```bash
# e2e tests
$ npm run test:e2e
``` 
```bash
# test coverage
$ npm run test:cov
```

## Support
This Project is an experimental playground and is not supported in any way.

## Issues
If you have any issues, please open an issue in the [issues section] of this repository.

## License
The Project is [MIT licensed](LICENSE).
