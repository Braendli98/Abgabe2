describe('login page tests', () => {
    before(() => {
        cy.visit('/login');
    });

    it('check if elements are present, check input fields', () => {
        cy.get('[data-cy="username-label"]');
        cy.get('[data-cy="password-label"]');

        cy.get('input[id="username"]').type('user');
        cy.get('input[id="password"]').type('p');

        cy.get('[data-cy="login-button"]');
    });

    it('check if invalid credentials create alert', () => {
        cy.visit('/login');

        cy.get('input[id="username"]').type('invalid');
        cy.get('input[id="password"]').type('invalid');

        cy.get('[data-cy="login-button"]').click();

        cy.get('[data-cy="login-alert');
    });
});
