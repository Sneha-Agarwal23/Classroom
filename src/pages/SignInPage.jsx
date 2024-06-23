// SignInPage.js
import React from 'react';
import { Quote } from '../components/Quote';
import { Auth } from '../components/Auth';



const SignInPage = ({ userType }) => {
  const handleSignIn = (event) => {
    event.preventDefault();
    // Add your sign-in logic here
  };

  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth/>
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
  );
};

export default SignInPage;
