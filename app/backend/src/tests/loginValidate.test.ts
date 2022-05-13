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
  password: 'senha_certa',
};


describe('Teste de integração da rota login/validate', () => {
  let chaiHttpResponse: Response;
  describe('Verifica o retorno em casos de inputs incorretos', () => {
    it('1 - Caso seja passado um token inválido', async () => {
      chaiHttpResponse =  await chai.request(app).get('/login/validate').set('authorization', 'invalid_token');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Expired or invalid token',
      );
    });
  });
});
