// SignInPage.js
import React from 'react';
import { QuoteSignup } from '../components/QuoteSignup';
import { AuthSignup } from '../components/AuthSignup';



const SignUpPage = ({ userType }) => {
  const handleSignIn = (event) => {
    event.preventDefault();
    // Add your sign-in logic here
  };

  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthSignup/>
            </div>
            <div className="hidden lg:block">
                <QuoteSignup />
            </div>
        </div>
    </div>
  );
};

export default SignUpPage;
