import React from 'react';

import { LoginMethodType } from '../enums';

export interface LoginMethod {
  Icon: React.FC;
  description: string;
  id: LoginMethodType;
  title: string;
}
