export type AuthRegisterResult = {
  id: string;
  email: string;
  createdAt: Date;
};

export type AuthLoginResult = {
  token: string;
};
