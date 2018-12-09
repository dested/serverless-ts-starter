import * as jwt from 'jsonwebtoken';
import {Config} from '../config';
import {HttpUser} from '../models/httpUser';
import {RequestHeaders} from './models';
import {respond} from './respond';

export class AuthService {
  static async createToken(user: HttpUser): Promise<string> {
    const expiresIn = 24 * 60 * 60 * 365 * 10;
    const token = jwt.sign(user, Config.jwtKey, {expiresIn});
    return token;
  }

  static validate<T>(headers: RequestHeaders) {
    try {
      const token = headers.authorization || (headers as any).Authorization;
      const j = jwt.verify(token.replace('Bearer ', ''), Config.jwtKey);
      return (j as unknown) as T;
    } catch (ex) {
      return null;
    }
  }
}
