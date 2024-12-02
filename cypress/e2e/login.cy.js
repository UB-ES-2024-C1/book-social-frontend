describe('Login test', () => {
  it('successfully loads', () => {
      cy.visit('/')

      cy.contains('Welcome').should('be.visible');
  })

  it('should log in through the modal', () => {
    // Visitar la página principal
    cy.visit('/'); // Cambia la URL si no es `/`

    // Abrir el modal (asegúrate de que el evento para abrir el modal sea detectable)
    cy.contains('Login').click(); // Cambia el selector si es necesario

    // Asegúrate de que el modal esté visible
    cy.get('[aria-labelledby="modal-title"]').should('be.visible');

    // Rellena los campos de usuario y contraseña
    
    cy.get('[data-testid="username-input"]').type('testuser');
    cy.get('[data-testid="password-input"]').type('Password123');

    // Haz clic en el botón de inicio de sesión
    cy.get('[data-testid="login-button"]', { timeout: 10000 }).should('be.visible').click();



    // Verifica la redirección o el cambio de estado
    cy.wait(500);
    cy.url().should('include', '/home'); // Ajusta según la ruta de redirección esperada

  });
})