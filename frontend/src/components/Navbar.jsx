import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
  
    const handleUserLogin = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('user-login', handleUserLogin);
    return () => window.removeEventListener('user-login', handleUserLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="bg-gray-900 px-6 py-4">
      <nav className="bg-black text-white px-6 py-4 shadow-lg flex justify-between items-center rounded-full max-w-7xl mx-auto">
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
            Moodboard Maker
          </Link>
        </div>

        <div className="flex gap-6 text-sm md:text-base items-center">
          <Link to="/" className="hover:text-gray-400 transition-colors duration-200">
            Home
          </Link>
          <Link to="/boards" className="hover:text-gray-400 transition-colors duration-200">
            Create Board
          </Link>

          {user ? (
            <>
             <span className="text-green-400 font-medium">
       Hi, {user.email.split('@')[0]}
           </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400 transition-colors duration-200">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-700 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
