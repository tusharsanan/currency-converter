# Currency Conversion using LitElement, Lion Web Components with JavaScript

This project includes a currency conversion component using LitElement with JavaScript.

This project loads an app where the customer can check the currency conversion rates. The app has four form fields, two input fields to enter the source or destination currency value, and two dropdowns to select the source or destination currency.
When this app loads, a customer sees the base currency in both the dropdowns and a value of 1,00 in both the input fields. When the customer changes either of the form fields, the currency value changes depending on the selection made.

If there is an error while fetching the data from the API, an error message would be shown to the customer. A customer can then refresh the page to try again.

Until the data is fetched from the API on page load, a "Please wait..." message would appear on the screen for the customer to know that the data is being loaded.

This app is created keeping accessibility in mind, and thus there is a Lit A11Y plugin which runs when running yarn lint, and detects any A11Y errors the code has.

LitElement is chosen for this because it is lightweight, and makes it easier to build and share web components. Also, this app uses Lion Web Components which is open sourced by ING. It provides us with lightweight components, easily shippable and configurable, by adding our own styling to the already accessible components.

## Setup

Install dependencies:

```bash
npm i
```

## Testing

This sample modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) along with
Mocha, Chai, and some related helpers for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script:

```bash
npm test
```

## Dev Server

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

## Automated tests

This uses Cypress to run automated tests. This was chosen because it is really easy to install, no additional dependencies, runs in local, which makes debugging easier. Cypress also offers to record test results, screenshots and video, which are great for debugging.

Please Note: The automated tests might fail, because the API values might be changing over time. For this, we might need to intercept the response, or find a MITM to record the response and use it against running the tests. For time constraints, I could not do it, but thought it is worth mentioning :)

To run the automated tests, please run this script:

```bash
npm run cypress:open
```

## Editing

If you use VS Code, we highly reccomend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to reccomend lit-plugin to VS Code users if they don't already have it installed.

## Linting

Linting of JavaScript files is provided by [ESLint](eslint.org). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Polymer Project's style.

Prettier has not been configured to run when committing files, but this can be added with Husky.

To format, please run:

```bash
npm run format
```

The site will usually be served at http://localhost:8000.

## Bundling and minification

Rollup is used for bundling, as it is recommended by Open Web Components and it provides with a great set of features like minifying lit-html templates, JS, optional support for older browsers etc.

To run the build, run:

```bash
npm run start:build
```
