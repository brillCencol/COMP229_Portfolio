import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInNavbar from '@/components/SignInNavbar';

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
        // ✅ Validate response
        if (!data.user || !data.user.role) {
          navigate('/'); // Invalid user → go back home
          return;
        }

        // ✅ Save session
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data.user));

        // ✅ Redirect based on role
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
      <SignInNavbar />
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {values.loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
