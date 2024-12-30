// .js file instead of .ts because of https://github.com/cypress-io/cypress/issues/23552
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
  },
});
