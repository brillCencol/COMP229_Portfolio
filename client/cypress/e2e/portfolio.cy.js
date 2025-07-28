describe('Brill Portfolio App', () => {
  it('waits and loads the Home Page', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Welcome to My Portfolio'); // Check hero heading
    cy.wait(1000); // Wait to ensure DOM is ready
  });

  it('navigates to About page through navbar', () => {
    cy.visit('http://localhost:5173');
    cy.get('a').contains('About').click(); // Find link tag with About
    cy.url().should('include', '/about');
    cy.contains('About Me'); // H1 title
    cy.contains('Brill John Torino');
    cy.contains('Education & Experience');
  });

  it('navigates to Projects page through navbar', () => {
    cy.visit('http://localhost:5173');
    cy.get('a').contains('Projects').click();
    cy.url().should('include', '/projects');
  });

  it('navigates to Contact page through navbar', () => {
    cy.visit('http://localhost:5173');
    cy.get('a').contains('Contact').click();
    cy.url().should('include', '/contact');
  });
});
