import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SignInNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-blue-600 hover:underline">
          Home
        </Link>

        {user?.role === 'admin' && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, <span className="font-medium">{user.name}</span>!
            </span>

            <Link
              to="/admin/dashboard"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-600 text-sm font-medium hover:underline"
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default SignInNavbar;
