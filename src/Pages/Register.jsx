import React, { useRef } from 'react';
import { signUpUser } from '../Config/Firebase/Firebasemethode';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const fullName = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();

    signUpUser({
      email: email.current.value,
      password: password.current.value,
      fullname: fullName.current.value,
    })
      .then((res) => {
        console.log(res);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        alert('Registration failed. Please try again!');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
        <form onSubmit={registerUser} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              ref={fullName}
              className="input input-bordered w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              ref={email}
              className="input input-bordered w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              ref={password}
              className="input input-bordered w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-medium transition-all duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
