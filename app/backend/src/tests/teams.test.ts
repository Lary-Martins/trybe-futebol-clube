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
    id: 1,
    teamName: 'Flamengo',
  },
  {
    id: 10,
    teamName: 'Vasco',
  },
];

describe('Teste de integração da rota teams', () => {});