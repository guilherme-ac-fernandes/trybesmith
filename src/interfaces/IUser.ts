export interface ILogin {
  username: string,
  password: string,
}

export interface IUser extends ILogin {
  classe: string,
  level: number,
}

export interface ICreateUser extends IUser {
  id: number,
}
