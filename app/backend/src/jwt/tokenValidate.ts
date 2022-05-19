import * as fs from 'fs/promises';
import { verify } from 'jsonwebtoken';
import { IPayloadLogin } from '../interfaces/payloadInterfaces/IPayloadLogin ';

const validateToken = async (token:string) => {
  try {
    const SECRET_KEY = await fs.readFile('./jwt.evaluation.key', 'utf-8');
    const response = verify(token, SECRET_KEY);
    return response as IPayloadLogin;
  } catch (err) {
    return false;
  }
};

export default validateToken;
