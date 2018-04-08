const request = require('supertest');

const app = require('../app');

describe('login', function() {
  it('should return 200', function(done) {
    request(app)
      .get('/login')
      .expect(200, done); 
  });
});

describe('apiv1/anuncios', function() {
  it('should return 401', function(done) {
    request(app)
      .get('/apiv1/anuncios')
      .expect(401, done); 
  });
});

describe('apiv/authenticate', function() {
 	it('should return 200', function(done) {
    	request(app)
      	.post('/apiv1/authenticate')
      	.send({email: 'user@example.com',password: '1234'})
      	.expect('Content-Type', /json/)
      	.expect(200, done); 
	})
})

