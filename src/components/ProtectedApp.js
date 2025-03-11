import React from 'react';
import PasswordProtect from 'react-password-protect';
import FinancialReport from './FinancialReport';

const ProtectedApp = () => {
  return (
    <div>
      <PasswordProtect password="shaklee">
        <FinancialReport />
      </PasswordProtect>
    </div>
  );
};

export default ProtectedApp;