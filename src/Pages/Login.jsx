import React, { useRef } from 'react';
import { loginUser } from '../Config/Firebase/Firebasemethode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const loginUsers = (event) => {
    event.preventDefault();
    loginUser({
      email: email.current.value,
      password: password.current.value,
    })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        alert('Login fild!, Please try again');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
        <form onSubmit={loginUsers} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              ref={email}
              className="input input-bordered w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="input input-bordered w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            registerUser
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
