describe('http://localhost:3307/login', () => {
	describe('Page Loads', () =>{
		it('Should load page',() =>{
			cy.visit('http://localhost:3307/login')
		})
	})

	describe('Prueba de DungeonCompanion', () =>{
	describe('Prueba de Login',()=>{
		it('Login',() =>{
			cy.visit('http://localhost:3307/login')

			cy.contains("Correo Electrónico").click().type('dm@dm.com');
			cy.contains('Contraseña').click().type('123');
			cy.contains('Entrar').click();
		})
	})
	describe('Pruebas de Navegacion',() =>{
		it('Abre Perfil',() =>{
			cy.visit('http://localhost:3307/login')
			cy.contains("Correo Electrónico").click().type('dm@dm.com');
			cy.contains('Contraseña').click().type('123');
			cy.contains('Entrar').click();
			cy.contains('Consultar Jugadores').click();
		})
		it('Entrada a Bestiario',()=>{
			cy.visit('http://localhost:3307/login')
			cy.contains("Correo Electrónico").click().type('dm@dm.com');
			cy.contains('Contraseña').click().type('123');
			cy.contains('Entrar').click();
			cy.contains('Bestiario').click();
			cy.contains('Revisar las estadísticas de Adult Silver Dragon').click();
		})
	})
	describe('Numero correcto de tarjetas',() =>{
		it('Numero de Tarjetas',()=>{
			cy.visit('http://localhost:3307/login')
			cy.contains("Correo Electrónico").click().type('dm@dm.com');
			cy.contains('Contraseña').click().type('123');
			cy.contains('Entrar').click();
			cy.get('.starter-template').find('div').should('have.length', 7)
		})
	})
		
	describe('Prueba de Registro',()  =>{
		it('Registro de Usuario',()=>{
			cy.visit('http://localhost:3307/login')
			cy.contains("Registrar").click();
			cy.contains("Usuario").click().type("Cypress");
			cy.contains("Correo Electrónico").click().type("cy@cy.cy");
			cy.contains('Contraseña').click().type('123');
			cy.contains('Confirmar Contraseña').click().type('123')
			cy.get('#role').select("DM");
			cy.contains('Registarse').click();
		})	
	})
		
	})

})