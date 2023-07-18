Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, likes, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, likes, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit('')
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('Log in form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Matti Luukkainen logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog posted by cypress')
      cy.get('#author').type('Raxhacks Java God')
      cy.get('#url').type('https://google.com')
      cy.get('#create').click()
      cy.contains('a new blog Blog posted by cypress by Raxhacks Java God added')
    })
    describe('when blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog posted by cypress',
          author: 'Raxhacks Java God',
          likes: 0,
          url: 'https://google.com'
        })
      })

      it('the blog can be liked', function() {
        cy.get('#visibleinfo').click()
        cy.get('#likebtn').click()
      })
  
      it('the blog can be deleted', function() {
        cy.get('#visibleinfo').click()
        cy.get('#removebtn').click()
        cy.contains('Blog posted by cypress').should('not.exist')
      })

      it('the blogs appear sorted from more likes to less likes', function() {
        cy.createBlog({
          title: 'Blog posted by cypress 2',
          author: 'Raxhacks Java God',
          likes: 34,
          url: 'https://google2.com'
        })
        cy.get('.blog').eq(0).should('contain', 'Blog posted by cypress 2')
        cy.get('.blog').eq(1).should('contain', 'Blog posted by cypress')
      })
      

    })
  })
  describe('when another user logs in', function() {
    beforeEach(function() {
      const user = {
        name: 'Juan Cedillo',
        username: 'lagayola',
        password: 'secret'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.visit('')
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Blog posted by cypress',
        author: 'Raxhacks Java God',
        likes: 0,
        url: 'https://google.com'
      })
      cy.contains('logout').click()
      cy.login({ username: 'lagayola', password: 'secret' })
    })
    it('the blog posted by other user can not be deleted', function() {
      cy.get('#visibleinfo').click()
      cy.get('#removebtn').click()
      cy.get('.error')
        .should('contain', 'You are not the correct user.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})