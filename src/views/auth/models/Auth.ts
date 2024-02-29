export interface IUserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export enum IResetPasswordMode {
  START,
  END
}
