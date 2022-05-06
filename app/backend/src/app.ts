import * as express from 'express';
import * as bodyParser from 'body-parser';
import loginRoute from './routers/loginRouter';

class App {
  public app: express.Express;

  private apiRoutes = {
    login: '/login',
    teams: '/teams',
    matches: '/matches',
  };

  constructor() {
    this.app = express();
    this.config();
    this.app.use(bodyParser.json());
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  public start(PORT: number):void {
    this.app.listen(PORT, () => {
      console.warn('Server online');
    });
  }

  public routes(): void {
    this.app.use(this.apiRoutes.login, loginRoute);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
