import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const tokenMock = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjUyNDY5MzYzLCJleHAiOjE2NTMwNzQxNjN9.5UUX6-ZLIPrivLP-DEmLtsSF0a63G489koTvTrqGEpA`;


describe('Teste de integração da rota login/validate', () => {
  let chaiHttpResponse: Response;
  describe('Verifica o retorno em casos de input incorreto', () => {
    it('1 - Caso seja passado um token inválido', async () => {
      chaiHttpResponse =  await chai.request(app).get('/login/validate').set('authorization', 'invalid_token');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Expired or invalid token',
      );
    });
    it('2 - Caso NÃO seja passado um token', async () => {
      chaiHttpResponse =  await chai.request(app).get('/login/validate').set('authorization', '');

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Token not sent',
      );
    });
  });
  describe('Verifica o retorno em casos de input corretos', () => {
    it('1 - Caso seja passado um token válido', async () => {
      chaiHttpResponse =  await chai.request(app).get('/login/validate').set('authorization', tokenMock);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.equal('user');
    })
  });
});
