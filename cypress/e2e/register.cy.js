describe('SignInModal', () => {
    beforeEach(() => {
      // Cargar la aplicación antes de cada prueba
      cy.visit('/');  // Asegúrate de que esto sea la URL correcta donde se muestra el modal
    });
  
    it('should open the modal when triggered', () => {
      // Asumimos que tienes un botón o algún trigger para abrir el modal
      cy.contains('Sign').click();
      
      // Verificar que el modal esté visible
      cy.get('[aria-labelledby="modal-title"]').should('be.visible');
    });
  
  
    it('should allow the user to fill out the form and submit', () => {
      // Abrir el modal
      cy.contains('Sign').click();
      cy.get('[data-testid="username-input"]').should('be.visible');
      
      // Llenar el formulario
      cy.get('[data-testid="name-input"]').type('test');
      cy.get('[data-testid="username-input"]').type('user');
      cy.get('[data-testid="email"]').type('testuser@test.com');
      cy.get('[data-testid="password-input"]').type('Password123');
      cy.get('[data-testid="password2-input"]').type('Password123');
      
      // Seleccionar opciones del dropdown
      cy.get('[data-testid="genre-dropdown"]').click();
      cy.contains('.MuiMenuItem-root', 'Fiction').click();
      cy.get('[data-testid="person-type-dropdown"]').click();
      cy.contains('.MuiMenuItem-root', 'Reader').click();
      
      // Hacer clic en el botón de 'Crear cuenta'
      cy.get('[data-testid="create-button');
      
      // Verificar que la navegación o el comportamiento esperado suceda después de enviar el formulario
      //cy.url().should('include', '/home');  // Verifica la redirección, ajusta según sea necesario
    });
  });
  