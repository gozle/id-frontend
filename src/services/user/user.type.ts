import { ColorScheme, Gender } from '@lib/enums';
import { NotNullableObject, User } from '@lib/types';

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export enum Role {
  ADMIN = 'admin',
}

export type GetSelfResponse = {
  avatar: string | null;
  balance: number;
  birthday: string | null;
  city: number | null;
  created_at: string | number;
  email: string;
  first_name: string;
  gender: Gender | null;
  id: number;
  language: number | null;
  last_name: string;
  phone_number: string;
  region: number | null;
  theme: ColorScheme;
  username: string;
};

export type UpdateUserRequest = Partial<
  Pick<
    NotNullableObject<User>,
    | 'birthday'
    | 'city'
    | 'email'
    | 'firstName'
    | 'gender'
    | 'language'
    | 'lastName'
    | 'region'
    | 'theme'
    | 'username'
  >
> & {
  avatar?: File | null;
};

export type UpdateUserResponse = void;
