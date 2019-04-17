# AWS Lambda boilerplate


## Prerequisites

- Node.js 8+
- Yarn

## Usage

- `git clone --origin boilerplate https://github.com/leapdao/leap-lambda-boilerplate.git <your-project-name>`
- `cd <your-project-name> && git remote add origin git@github.com:leapdao/<your-project-name>.git`
- change name in `package.json`
- `yarn`
- Enjoy :-)

## Tests

[Jest](https://jestjs.io/) used for unit-testing. Put your test file near module that you want to test. For example, for `src/cool-module.js` you should create a file `src/cool-module.test.js`.

- `yarn test` — run tests
- `yarn test:watch` — run tests in watch mode
