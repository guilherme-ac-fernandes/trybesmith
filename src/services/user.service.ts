import createToken from '../helpers/createToken';
import IUser from '../interfaces/IUser';
import UserModel from '../models/user.model';

export default class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(user: IUser) { 
    await this.model.create(user);
    const token = createToken(user.username);
    return token;
  }
}