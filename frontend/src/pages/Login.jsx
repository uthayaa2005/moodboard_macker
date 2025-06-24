import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://moodboard-macker-1.onrender.com/api/auth/login', {
        email,
        password,
      });

      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('user-login'));

      alert("Login Successful ✅");
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 font-poppins text-white">
      
      {/* ✅ Text outside login box */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="text-lg text-gray-300">
          Login and enjoy creating your <span className="text-blue-400 font-semibold">Moodboard 🎨</span>
        </p>
      </div>

      {/* Login form box */}
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-5 text-center text-gray-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
