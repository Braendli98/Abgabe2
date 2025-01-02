describe('login page tests', () => {
    it('visit login page, check if elements are present, check input fields', () => {
        cy.visit('/login');

        cy.get('[data-cy="username-label"]');
        cy.get('[data-cy="password-label"]');

        cy.get('input[id="username"]').type('user');
        cy.get('input[id="password"]').type('p');

        cy.get('[data-cy="login-button"]');
    });
});
