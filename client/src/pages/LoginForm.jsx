import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false
  });

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        if (!data.user || !data.user.role) {
          navigate('/');
          return;
        }

        localStorage.setItem("token", data.token); // ✅ plain string
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ JSON string

        if (data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setValues({ ...values, error: data.error, loading: false });
      }
    } catch (err) {
      setValues({ ...values, error: 'Server error. Try again later.', loading: false });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border shadow rounded">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {values.error && <p className="text-red-600 mb-4">{values.error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange('email')}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange('password')}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={values.loading}
            className={`w-full bg-black text-white px-4 py-3 rounded text-center hover:bg-gray-800 cursor-pointer ${values.loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}

          >
            {values.loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
