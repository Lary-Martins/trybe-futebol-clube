import * as fs from 'fs/promises';
import { sign } from 'jsonwebtoken';
import { IPayloadLogin } from '../interfaces/IPayloadLogin ';

const signUser = async (payload:IPayloadLogin, duration = '7d'): Promise<string> => {
  const SECRET_KEY = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  const token = sign(payload, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: duration,
  });
  return token;
};

export default signUser;
