import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RegisterPage = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.role === 'admin';

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    loading: false,
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [makeAdmin, setMakeAdmin] = useState(false);

  useEffect(() => {
    if (!editId) {
      setValues({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        loading: false
      });
      setMakeAdmin(false);
    }

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, editId]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    const endpoint = editId
      ? `http://localhost:3000/api/users/${editId}`
      : 'http://localhost:3000/api/users';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          role: makeAdmin ? 'admin' : 'user',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setValues({ name: '', email: '', password: '', error: '', success: true, loading: false });
        setEditId(null);
        setMakeAdmin(false);

        // If current user edited their own account AND removed their admin role:
        if (editId === currentUser?._id && isAdmin && !makeAdmin) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate('/login');
          return;
        }

        setTimeout(() => {
          alert(editId ? "User updated successfully ✅" : "User registered successfully ✅");

          if (currentUser || isAdmin) {
            fetchUsers();
          } else {
            navigate('/login');
          }
        }, 100);

      } else {
        if (data.error === "Email is already taken") {
          window.alert("That email is already in use.");
        }
        setValues({ ...values, error: data.error, loading: false });
      }
    } catch (err) {
      setValues({ ...values, error: 'Server error. Try again later.', loading: false });
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setValues({ name: user.name, email: user.email, password: '' });
    setMakeAdmin(user.role === 'admin');
  };

  const handleDelete = async (id) => {
    const isOwnAccount = currentUser._id === id;

    if (!isAdmin && !isOwnAccount) {
      return window.alert("You are not authorized to delete this user.");
    }

    const confirmed = window.confirm(
      isOwnAccount
        ? "Are you sure you want to delete your own account?"
        : "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        window.alert("User deleted successfully.");
        if (isOwnAccount) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate('/login');
        } else {
          fetchUsers();
        }
      } else {
        window.alert(data.error || "Delete failed");
      }
    } catch (err) {
      window.alert("Server error");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setValues({ name: '', email: '', password: '', error: '', success: false, loading: false });
    setMakeAdmin(false);
  };

  return (
    <>
      <Navbar />

      {/* ✅ Show form ONLY if not logged in OR editing */}
      {(!currentUser || editId) && (
        <div className="max-w-xl mx-auto mt-10 p-6 border shadow rounded relative">
          <button
            onClick={handleCancel}
            className="absolute top-2 right-2 text-red-500 text-lg font-bold hover:cursor-pointer"
            title="Cancel"
          >
            ✖
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-center">
            {editId ? 'Edit User' : 'Register'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Name" value={values.name} onChange={handleChange('name')} className="w-full p-2 border rounded" required />
            <input type="email" placeholder="Email" value={values.email} onChange={handleChange('email')} className="w-full p-2 border rounded" required />
            <input type="password" placeholder="Password" value={values.password} onChange={handleChange('password')} className="w-full p-2 border rounded" required />

            {isAdmin && (
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={makeAdmin} onChange={() => setMakeAdmin(!makeAdmin)} />
                <span>Make Admin</span>
              </label>
            )}

            <button
              type="submit"
              disabled={values.loading}
              className={`w-full bg-black text-white px-4 py-3 rounded text-center hover:bg-gray-800 cursor-pointer ${values.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {values.loading ? (editId ? 'Updating...' : 'Registering...') : editId ? 'Update' : 'Register'}
            </button>
          </form>

          {!editId && !currentUser && (
            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          )}
        </div>
      )}

      {/* ✅ Admin: All users */}
      {isAdmin && (
        <div className="max-w-2xl mx-auto mt-10 space-y-4">
          <div className="max-w-2xl mx-auto mt-10 p-4 border shadow rounded">
            <h3 className="text-xl font-semibold mb-4">All Users</h3>
            <ul className="space-y-3">
              {users.map((user) => (
                <li key={user._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300  transition-colors cursor-pointer"
                      title="Edit user"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer"
                      title="Delete user"
                    >
                      🗑️
                    </button>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ✅ Non-admin user info */}
      {!isAdmin && currentUser && (
        <div className="max-w-2xl mx-auto mt-10 p-4 border shadow rounded">
          <h3 className="text-xl font-semibold mb-4">User Info</h3>
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Role:</strong> {currentUser.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(currentUser)}
                className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer"
                title="Edit user"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(currentUser._id)}
                className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer"
                title="Delete user"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default RegisterPage;
