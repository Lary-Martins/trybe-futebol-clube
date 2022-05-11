import * as fs from 'fs/promises';
import { verify } from 'jsonwebtoken';

const validateUser = async (token:string) => {
  try {
    const SECRET_KEY = await fs.readFile('./jwt.evaluation.key', 'utf-8');
    const response = verify(token, SECRET_KEY);
    return response;
  } catch (err) {
    const message = 'Expired or invalid token';
    return message;
  }
};

export default validateUser;
