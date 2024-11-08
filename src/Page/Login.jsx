import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');

  const handleChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !category) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (password.length < 8) {
      Swal.fire({
        title: 'Error!',
        text: 'Password must be at least 8 characters long.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email,
        password,
        category,
      });

      const responseData = response.data;
      if (responseData.success) {
        localStorage.clear();
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('category', responseData.category);
        localStorage.setItem('Id', responseData.data.user.id);
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setEmail('');
          setPassword('');
          setCategory('');
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: responseData.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.log({ error: 'occur in frontend', details: error });
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-lg p-8 bg-gray-900 border-2 border-white rounded-4 shadow-lg rounded-lg space-y-12">
        <h2 className="text-2xl font-semibold text-center">Log In to Your Account</h2>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <span
              onClick={() => handleChange('Client')}
              className={`px-6 py-2 rounded-md border-2 cursor-pointer ${
                category === 'Client'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'border-white text-white hover:text-orange-400 hover:border-orange-400'
              }`}
            >
              Hire a Freelancer
            </span>

            <span
              onClick={() => handleChange('Freelancer')}
              className={`px-6 py-2 flex justify-center items-center rounded-md border-2 cursor-pointer ${
                category === 'Freelancer'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'border-white text-white hover:text-orange-400 hover:border-orange-400'
              }`}
            >
              Earn Money Freelancing
            </span>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition duration-200"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
