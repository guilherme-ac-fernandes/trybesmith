import createToken from '../helpers/createToken';
import { ILogin } from '../interfaces/IUser';
import LoginModel from '../models/login.model';

export default class UserService {
  private model: LoginModel;

  constructor() {
    this.model = new LoginModel();
  }

  public async login(user: ILogin) { 
    const foundUser = await this.model.login(user.username);

    if (!foundUser || foundUser.password !== user.password) {
      return { code: 401, message: 'Username or password invalid' };
    }
    const token = createToken(foundUser.id, user.username);
    return { code: 200, data: token };
  }
}