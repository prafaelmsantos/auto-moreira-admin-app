export interface IUserRegistration {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserLogin {
  userName: string;
  password: string;
}

export enum IResetPasswordMode {
  START,
  END
}
