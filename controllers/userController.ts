import {Config} from '../config';
import {HttpUser} from '../models/httpUser';
import {AuthService} from '../utils/authService';
import {controller, request} from '../utils/decorators';
import {RequestEvent} from '../utils/models';
import {HttpResponse, respond} from '../utils/respond';

@controller('user')
export class UserController {
  @request('POST', 'register')
  static async register(
    event: RequestEvent<RegisterRequest>
  ): Promise<HttpResponse<JwtGetUserResponse, {statusCode: 400; error: string}>> {
    const {email} = event.params;

    if (email === 'bad') {
      /*this error is safely typed based on the return of the promise*/
      return respond(400, {error: 'go away'});
    }

    const user = {age: 12, email};
    const jwt = await AuthService.createToken(user);
    return respond(200, {jwt, user});
  }
}

export interface RegisterRequest {
  email: string;
}

export interface JwtGetUserResponse extends UserResponse {
  jwt: string;
}

export interface UserResponse {
  user: HttpUser;
}
