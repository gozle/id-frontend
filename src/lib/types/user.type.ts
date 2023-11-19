import { ColorScheme, Gender } from '@lib/enums';

export type User = {
  avatar: string | null;
  balance: number;
  birthday: string | null;
  city: number | null;
  createdAt: string | number;
  email: string;
  firstName: string;
  gender: Gender | null;
  id: number;
  language: number | null;
  lastName: string;
  phoneNumber: string;
  region: number | null;
  theme: ColorScheme;
  username: string;
};

export type UserProfile = {
  city: number | null;
  firstName: string;
  gender: Gender | null;
  language: number | null;
  lastName: string;
  region: number | null;
};
