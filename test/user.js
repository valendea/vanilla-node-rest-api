process.env.NODE_ENV = 'test';

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  describe('/GET user', () => {
    it('should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
  
  describe('/GET/:id user', () => {
    it('should GET a user by the given id', (done) => {
      chai.request(server)
        .get('/api/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql('1');
          res.body.should.have.property('name').eql('Leanne Graham');
          res.body.should.have.property('username').eql('Bret');
          res.body.should.have.property('email').eql('Sincere@april.biz');
          done();
        });
    });
  });

  describe('/POST user', () => {
    const userParams = {
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca"
    }
    
    it('should create a user', (done) => {
      chai.request(server)
        .post('/api/users')
        .send(userParams)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name').eql(userParams.name);
          res.body.should.have.property('username').eql(userParams.username);
          res.body.should.have.property('email').eql(userParams.email);
          done();
        });
    });
  });
  
  describe('/PUT/:id user', () => {
    const userParams = { username: "Blabla"}

    it('should update a user by the given id', (done) => {
      chai.request(server)
        .put('/api/users/1')
        .send(userParams)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql('1');
          res.body.should.have.property('name');
          res.body.should.have.property('username').eql(userParams.username);
          res.body.should.have.property('email');
          done();
        });
    });
  });
  
  describe('/DELETE/:id user', () => {
    it('should delete a user by the given id', (done) => {
      chai.request(server)
        .delete('/api/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User 1 has been removed.');
          done();
        });
    });
  });
});

