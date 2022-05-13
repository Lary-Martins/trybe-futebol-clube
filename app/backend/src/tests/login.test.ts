import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

describe('Teste de integração da rota login', () => {
  let chaiHttpResponse: Response;
  describe('Verifica o retorno em casos de inputs incorretos', () => {
    it('1 - Caso seja passado o "email" errado', async () => {
      before(async () => {
        sinon.stub(Users, 'findOne').resolves(userMock as Users);
      });

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'noAdmin@noAdmin.com',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Incorrect email or password',
      );
    });
    it('2 - Caso seja passado o "password" errado', async () => {
      before(async () => {
        sinon.stub(Users, 'findOne').resolves(userMock as Users);
      });

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'senha_errada',
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Incorrect email or password',
      );
    });
    it('3 - Caso NÃO seja passado o "email"', async () => {
      before(async () => {
        sinon.stub(Users, 'findOne').resolves(userMock as Users);
      });

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(
        'All fields must be filled',
      );
    });
    it('4 - Caso NÃO seja passado o "password"', async () => {
      before(async () => {
        sinon.stub(Users, 'findOne').resolves(userMock as Users);
      });

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: '',
      });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(
        'All fields must be filled',
      );
    });
  });
  describe('Verifica o retorno em caso de inputs corretos', () => {
    it('1 - Caso os seja passado o email e password corretamente', async () => {
      const userMockCorrect = {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      };

      before(async () => {
        sinon.stub(Users , 'findOne').resolves(userMockCorrect as Users);
      });

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
    })
  });
});
