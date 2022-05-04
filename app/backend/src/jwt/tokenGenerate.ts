import * as fs from 'fs/promises';
import { sign } from 'jsonwebtoken';
import { IPayloadToken } from '../interfaces/payloadJwt';

const signUser = async (payload:IPayloadToken, duration = '7d'): Promise<string> => {
  const SECRET_KEY = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  const token = sign(payload, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: duration,
  });
  return token;
};

export default signUser;
