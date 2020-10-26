import {Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"

const url = 'https://www.posthaus.com.br/minha-conta/novo-cadastro'

Given ("esteja na página de novo cadastro", () => {
    cy.visit(url)
    cy.url().should('eq', 'https://www.posthaus.com.br/minha-conta/novo-cadastro')
})

When ("preencher corretamente todos os campos do novo cadastro", () => {
    cy.get(':nth-child(1) > .sc-uJMKN > .sc-fAjcbJ').type('Ermae de Carvalho');
    cy.get(':nth-child(2) > .sc-uJMKN > .sc-fAjcbJ').type('84705306074'); //digitar cpf válido
    cy.get(':nth-child(3) > .sc-uJMKN > .sc-fAjcbJ').type(15031982);
    cy.get('#Sexo').select("Masculino");
    cy.get(':nth-child(5) > .sc-uJMKN > .sc-fAjcbJ').type(81999999999);
    cy.get(':nth-child(6) > .sc-uJMKN > .sc-fAjcbJ').type('assfhdjsh@email.com'); //digitar email válido
    cy.get(':nth-child(7) > .sc-uJMKN > .sc-fAjcbJ').type('123456');
    cy.get('.gxsrok > :nth-child(1) > .sc-fAjcbJ').type(38706400);
    cy.get(':nth-child(10) > .sc-uJMKN > .sc-fAjcbJ').click();
    cy.get(':nth-child(11) > .sc-uJMKN > .sc-fAjcbJ').type(580);
    cy.get(':nth-child(12) > .sc-uJMKN > .sc-fAjcbJ').type("Casa da esquina");
})

And ("clicar em Cadastrar", () => {
    cy.server(); //criando servidor
    cy.route('POST', '**/rest/client/v1/').as('newIncident'); //definindo rota que será escutada após determinado "incidente"
    cy.get(':nth-child(18) > .sc-uJMKN > .sc-cHGsZl').click(); // comando(incidente) que dará o start na escuta da rota

    cy.wait('@newIncident').then((xhr) => {
        expect(xhr.status).to.eq(200);  
        expect(xhr.response.body).has.property('clientCode');
        expect(xhr.response.body.clientCode).is.not.null;
    })
})

Then ("deverá ser redirecionado para a home", () => {
    cy.url().should('eq', 'https://www.posthaus.com.br/'); //para confirmar se a operação terminou na home
})