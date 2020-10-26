@realizar_cadastro
Feature: Realizar cadastro

    Scenario: Realizar cadastro na página Posthaus
        Given esteja na página de novo cadastro
        When preencher corretamente todos os campos do novo cadastro
        And clicar em Cadastrar
        Then deverá ser redirecionado para a home