export type LoginCreds = {
  email: string;
  password: string;
};

export type SignUpCreds = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type UserInfo = {
  email: string;
  uid: string;
  name: string;
  photoFile?: string;
};

export type UpdateUserInfo = {
  name: string;
  photoFile: FileList;
  email: string;
  password: string;
  passwordConfirm: string;
  uid: string;
};

export type Users = UserInfo[];
export type UserFormData = Omit<UserInfo, "_id">;
