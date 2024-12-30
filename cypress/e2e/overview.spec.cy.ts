describe('overview page tests', () => {
    it('visit overview page, check if elements are present', () => {
      cy.visit('/');
  
      cy.get('[data-cy="header"]');
      cy.get('[data-cy="hka-logo"]');
    })
  })