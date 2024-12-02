describe('Login test', () => {
  it('successfully loads', () => {
      cy.visit('/')

      cy.contains('Welcome').should('be.visible');
  })
})