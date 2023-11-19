import React from 'react';

import { CodeForm } from '@components/auth';

interface P {
  inView: boolean;
  onAfterSubmit: (res: { code: string }) => void;
}

export const PasswordResetCodeFormContainer = ({
  inView,
  onAfterSubmit,
}: P) => {
  const handleCodeSubmit = async (body: { code: string }) => {
    onAfterSubmit(body);
  };

  return (
    <CodeForm inView={inView} loading={false} onSubmit={handleCodeSubmit} />
  );
};
