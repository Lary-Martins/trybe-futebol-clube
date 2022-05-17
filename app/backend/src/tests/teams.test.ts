import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamsArrMock = [
  {
      "id": 1,
      "teamName": "Avaí/Kindermann"
  },
  {
      "id": 2,
      "teamName": "Bahia"
  },
  {
      "id": 3,
      "teamName": "Botafogo"
  },
  {
      "id": 4,
      "teamName": "Corinthians"
  },
  {
      "id": 5,
      "teamName": "Cruzeiro"
  },
  {
      "id": 6,
      "teamName": "Ferroviária"
  },
  {
      "id": 7,
      "teamName": "Flamengo"
  },
  {
      "id": 8,
      "teamName": "Grêmio"
  },
  {
      "id": 9,
      "teamName": "Internacional"
  },
  {
      "id": 10,
      "teamName": "Minas Brasília"
  },
  {
      "id": 11,
      "teamName": "Napoli-SC"
  },
  {
      "id": 12,
      "teamName": "Palmeiras"
  },
  {
      "id": 13,
      "teamName": "Real Brasília"
  },
  {
      "id": 14,
      "teamName": "Santos"
  },
  {
      "id": 15,
      "teamName": "São José-SP"
  },
  {
      "id": 16,
      "teamName": "São Paulo"
  }
]

describe('Teste de integração da rota teams', () => {
  let chaiHttpResponse: Response;
  describe('Verifica se os dados corretos são retornados', () => {
    it('1 - Caso exista inserções no Banco de Dados, deve retornar um array com os dados', async () => {
      before(async () => {
        sinon.stub(Teams, 'findAll').resolves(teamsArrMock as Teams[]);
      });

      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.have.length(16);
    });
  });
});
