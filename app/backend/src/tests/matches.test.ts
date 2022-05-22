import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const matchesArrMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  }
]

describe('Teste de integração da rota matches', () => {
  let chaiHttpResponse: Response;
  describe('Verifica se os dados corretos são retornados', () => {
    it('1 - Caso exista inserções do Banco de Dados, deve retornar um array com os dados',
    async () => {
      before(async () => {
        sinon.stub(Matches, 'findAll'). resolves(matchesArrMock as unknown as Matches[]);
      });

      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.have.property('teamHome');
      expect(chaiHttpResponse.body).to.be.have.property('teamAway');

    })
  })
})
