import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    await login(values);
  };

  return (
    <main className="flex flex-col md:flex-row">
      {/* side image */}
      <section className="hidden md:block  bg-black max-w-[466px] ">
        <img src="side-image.png" alt="Login" className="w-full h-full object-fit" />
      </section>
      <section className="flex flex-col justify-center items-center md:ml-[143px] mr-8 bg-white h-[598px] mt-[171px]">
        <div className="w-[440px]">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold mb-3">Sign In to Beam</h1>
            <p className="text-sm text-gray-500">
              Please sign in with your assigned login details
            </p>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-gray-500 block text-sm font-medium mb-1">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="text-gray-500 block text-sm font-medium mb-1">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="input input-bordered w-full text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 cursor-pointer"
                  >
                    {showPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
                  </span>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm">Forgot Password?</Link>
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary w-full bg-black rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>
                <div className="divider uppercase text-sm">or sign in with</div>
                <div className="flex justify-center space-x-4">
                  <button type="button" className="btn btn-outline border border-gray-400 flex items-center px-10 rounded-full">
                    <img src="google_icon.png" alt="Google" className="w-6 h-6" />
                  </button>
                  <button type="button" className="btn btn-outline border border-gray-400 flex items-center px-10 rounded-full">
                    <img src="apple.png" alt="Apple" className="w-6 h-6" />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
