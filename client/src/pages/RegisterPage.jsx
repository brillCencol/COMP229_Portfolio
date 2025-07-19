import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SignInNavbar from '@/components/SignInNavbar';

const RegisterPage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    loading: false
  });

  const navigate = useNavigate();

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setValues({
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
          loading: false
        });
        setTimeout(() => navigate('/login'), 1500); // Redirect after delay
      } else {
        setValues({ ...values, error: data.error, loading: false });
      }
    } catch (err) {
      setValues({
        ...values,
        error: 'Server error. Try again later.',
        loading: false
      });
    }
  };

  return (
    <>
      <SignInNavbar />
      <div className="max-w-md mx-auto mt-10 p-6 border shadow rounded">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        {values.error && <p className="text-red-600 mb-4">{values.error}</p>}
        {values.success && <p className="text-green-600 mb-4">Account created! Redirecting to login...</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange('name')}
            className="w-full p-2 border rounded"
            required
          />
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
            className={`w-full text-white py-2 rounded ${
              values.loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {values.loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
