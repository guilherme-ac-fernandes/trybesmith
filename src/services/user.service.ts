import createToken from '../helpers/createToken';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/user.model';

export default class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(user: IUser) { 
    const foundUser = await this.model.create(user);
    const token = createToken(foundUser.id, user.username);
    return { code: 201, data: token };
  }

  public async getUserById(userId: number) {
    const user = await this.model.getUserById(userId);
    return user;
  }
}