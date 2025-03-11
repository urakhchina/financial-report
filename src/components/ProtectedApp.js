import React from 'react';
import PasswordProtection from './PasswordProtection';
import FinancialReport from './FinancialReport';

const ProtectedApp = () => {
  return (
    <div>
      <PasswordProtection password="shaklee">
        <FinancialReport />
      </PasswordProtection>
    </div>
  );
};

export default ProtectedApp;