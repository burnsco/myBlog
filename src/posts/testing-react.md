---
title: Testing React - Setup, Unit, Integration and E2E using Jest and Cypress
date: '2019-09-22T16:29:53+0000'
---

Hi ! This is a guide/cheatsheet that I comeback to read when I want to write tests for a project.

I thought this my help other fellow developers so here you go 😁

# Setup

First, let's setup jest:

## Install jest, cypress and helper libraries

```sh
yarn add jest @testing-library/react @testing-library/jest-dom -D
```

## Config

In this section we'll configure Jest and Cypress

### Jest

Now that we have the libs installed. let's create a config file for Jest in the root directory:

```js
module.exports = {
  // location.href will have this value
  testURL: 'https://example.com',
  // Add here folders to ignore
  testPathIgnorePatterns: ['/node_modules/'],
  setupTestFrameworkScriptFile: require.resolve(
    './test/setup.js'
  ),
  // path to components/modules to test
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    // mock files that jest doesn't support like CSS and SVG files
    '\\.css$': '<rootDir>/test/module-mock.js',
    '\\.svg$': '<rootDir>/test/module-mock.js',
  },
  // collect coverage report from only the js files inside src
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      // 20 is just an example
      // you can change it to any value you want (below 100)
      statements: 20,
      branches: 20,
      functions: 20,
      lines: 20,
    },
  },
}
```

now create a `test` folder in the root directory and create `setup.js` file inside it:

```js
// cleanup helper
import '@testing-library/react/cleanup-after-each'
// custom matchers for jest
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
```

also create a `module-mock.js` in the same `test` folder :

```js
module.exports = {}
```

#### Code coverage

in _package.json_ add `--coverage` at the end of your `test` script:

```json
{
  ...
  "scripts": {
    ...
    "test": "jest --coverage"
  }
}
```

#### Watch mode

When coding, use Jest in watch mode to get instant feedback about the tests related to the files you are changing.
To use this feature, add a script to _package.json_ and use it:

```json
{
  ...
  "scripts": {
    ...
    "test:watch": "jest --watch"
  }
}
```

### Cypress

Install `cypress` and helpers:

```sh
yarn add cypress @testing-library/cypress -D
```

then add a script to _package.json_ to run cypress:

```json
{
  ...
  "scripts": {
    ...
    "cy:open": "cypress open",
    "cy:run": "cypress run", // run all cypress tests
  }
}
```

```sh
yarn cy:open
```

Cypress records videos and takes screenshots of the app while running test, let's add them to `.gitignore`

```
  ...
  cypress/videos
  cypress/screenshots
```

#### cypress.json

When running `cypress open` for the first time, it creates a bunch of files and folder inside a folder in the root dir called `cypress`. It also creates a file in the root dir called `cypress.json`. That's the configuration file cypress uses.

Let's add a baseUrl to use in our E2E test:

```json
//cypress.json
{
  "baseUrl": "http://localhost:3000"
}
```

#### @testing-library/cypress

`@testing-library/cypress` adds some very handy commands to cypress, let's configure it:

Go to `<rootDir>/cypress/support` and open `index.js` and add this line:

```js
import '@testing-library/cypress/add-commands'
...
```

### Test utils (helpers):

Have a test-utils file that exports a set of tools that are used specifically for the project you are testing.

#### Example:

Export a render method that takes care of adding styled-components ThemeProvider HOC:

```jsx
import React from 'react'
import {
  render as originalRender,
  wait,
} from '@testing-library/react'

const theme = {
  colors: {
    red: 'red',
  },
}

function render(component, renderOptions) {
  const utils = originalRender(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
    renderOptions
  )
  return {
    ...utils,
  }
}
export { render }
```

Now in your tests, import `render` from this test-utils file instead of `@testing-library/react`

# Unit test

Write a unit test when you want to test the functionality of _ONE function/component_:

```jsx
import React from 'react'
import { render } from '@testing-library/react'
import Paragraph from '../paragraph'

test('renders the text given', () => {
  const { getByText } = render(<Paragraph>Hello</Paragraph>)

  expect(getByText(/Hello/i)).toBeInTheDocument()
})
```

# Integration test

Write an integration test when you want to test the functionality of _several components working togather_:

```jsx
import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import { fireEvent } from '@testing-library/react'
import { render } from '../test-utils'
import App, { LOGIN_MUTATION } from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
})

test('login as a user', async () => {
  const fakeUser = { id: 123, username: 'fakeuser' }
  const fakeUserCredentials = {
    ...fakeUser,
    password: 'stupidpassword123',
  }
  const token =
    'thisisjustanexampleofatoken-youcanuseafakedatageneratorinstead'
  const loginMutationMock = jest.fn()
  const loginMutationErrorMock = jest.fn()
  const mocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          username: fakeUserCredentials.username,
          password: fakeUserCredentials.password,
        },
      },
      result: () => {
        loginMutationMock()
        return { data: { user: fakeUser, token: token } }
      },
      error: () => {
        loginMutationErrorMock()
      },
    },
  ]
  const {
    getByTestId,
    container,
    getByText,
    getByLabelText,
  } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )
  // open login form dialog/modal
  fireEvent.click(getByText(/login/i))
  // fill out login form
  const usernameNode = getByLabelText(/username/i)
  const passwordNode = getByLabelText(/password/i)
  usernameNode.value = fakeUserCredentials.username
  passwordNode.value = fakeUserCredentials.password
  // submit login form
  fireEvent.click(getByText(/sign in/i))
  // wait for the mocked requests to finish
  await wait(0)
  // assert calls
  expect(loginMutationMock).toHaveBeenCalledTimes(1)
  expect(loginMutationErrorMock).not.toHaveBeenCalled()
  // assert login side-effect
  expect(window.localStorage.getItem('token')).toBe(token)
  expect(getByTestId('username').textContent).toEqual(
    fakeUser.username
  )
})
```

# End to end test:

Simplest definition 🤷‍♂️ : Imagine you've got a robot that obeys your commands, now ask it to test your app as a normal user.

```js
describe('authentication and registration', () => {
  let user

  beforeEach(() => {
    return cy
      .logout()
      .createNewUser()
      .then(u => (user = u))
      .visit('/')
  })

  it('register as a guest user', () => {
    const user = {
      username: 'user',
      email: 'hello@example.com',
      password: 'password123',
    }
    cy.getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/email/i)
      .type(user.email)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/register/i)
      .click()
      .assertRoute('/')
    cy.getByTestId('username').should(
      'contain',
      user.username
    )
  })

  it('login as a user', () => {
    cy.getByText(/login/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/sign in/i)
      .click()
      .assertRoute('/')
    cy.getByTestId('username').should(
      'contain',
      user.username
    )
  })
})
```
