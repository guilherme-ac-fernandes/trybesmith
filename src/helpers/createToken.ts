// Aplicação da tipagem utilizando JWT proveniente site 'Become a Better Programmer'
// source: https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/
import { sign, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = 'algo_super_secreto';

export default (username: string) => {
  const jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
  const token = sign({ username }, JWT_SECRET, jwtConfig);
  return token;
};