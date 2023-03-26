// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        //cy.visit('https://google.com')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Test if this space is function all right. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. '
        cy.get('#firstName').type('Ravella')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('ravella@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        //cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formuláio com um email com formatação inválida', function() {
        cy.get('#firstName').type('Ravella')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('ravella.exemplo.com')
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()
        //cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo de telefone só aceita números e fica vazio se for digitado algo diferente', function() {
        cy.get('#phone').type('abc').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#phone-checkbox').check()
        cy.get('#firstName').type('Ravella')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('ravella@exemplo.com')
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()
        //cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Ravella').should('have.value', 'Ravella').clear().should('have.value', '')
        cy.get('#lastName').type('Rodrigues').should('have.value', 'Rodrigues').clear().should('have.value', '')
        cy.get('#email').type('ravella@exemplo.com').should('have.value', 'ravella@exemplo.com').clear().should('have.value', '')
        cy.get('#phone').type('993614567').should('have.value', '993614567').clear().should('have.value', '')
        cy.get('#open-text-area').type('Test').should('have.value', 'Test').clear().should('have.value', '')
        /*cy.get('#firstName').type('Ravella').should('have.value', 'Ravella')
        cy.get('#lastName').type('Rodrigues').should('have.value', 'Rodrigues')
        cy.get('#email').type('ravella@exemplo.com').should('have.value', 'ravella@exemplo.com')
        cy.get('#open-text-area').type('Test').should('have.value', 'Test')

        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#open-text-area').clear().should('have.value', '')*/
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        const longText = 'Test if this space is function all right. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. Test. '
        cy.fillMandatoryFieldsAndSubmit(longText)
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('select').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('select').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('select').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca o tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        /*cy.get('#email-checkbox').check().should('be.checked')
        cy.get('#phone-checkbox').check().should('be.checked')*/

        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click().title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})
