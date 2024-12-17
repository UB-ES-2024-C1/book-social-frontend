describe('Login test', () => {
    it('should log in through the modal', () => {
        const date = new Date(2024, 5, 18); // 18 de junio de 2024 (JavaScript usa 0-index para meses)

        // Obtener cada parte de la fecha
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11, por eso +1
        const dd = String(date.getDate()).padStart(2, '0');

        // Formatear a 'YYYY-MM-DD'
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        // Visitar la página principal
        cy.visit('/'); // Cambia la URL si no es `/`
    
        // Abrir el modal (asegúrate de que el evento para abrir el modal sea detectable)
        cy.contains('Login').click(); // Cambia el selector si es necesario
    
        // Asegúrate de que el modal esté visible
        cy.get('[aria-labelledby="modal-title"]').should('be.visible');
    
        // Rellena los campos de usuario y contraseña
        
        cy.get('[data-testid="username-input"]').type('raul.asins1@gmail.com');
        cy.get('[data-testid="password-input"]').type('Testpassword_24');
    
        // Haz clic en el botón de inicio de sesión
        cy.get('[data-testid="login-button"]').should('be.visible').click();
    
    
    
        // Verifica la redirección o el cambio de estado
        cy.url().should('include', '/home'); // Ajusta según la ruta de redirección esperada

        cy.get('[data-testid="button-new-post"]').click();

        // Llenar el formulario
        cy.get('[data-testid="title-input"]').type('This is a post test');
        cy.get('[data-testid="content-input"]').type('This is a post test made by cypress');

        cy.get('[data-testid="file-button');
        cy.get('[data-testid="submit-button');
        cy.get('[data-testid="cancel-button');

      });
  })