import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    agree: Yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
  });

  const handleSubmit = async (values: { fullName: string; email: string; password: string }) => {
    await register(values);
  };

  return (
    <main className="flex flex-col md:flex-row">
      {/* side image */}
      <section className="hidden md:block  max-w-[466px]">
        <img
          src="side-image.png"
          alt="Login"
          className="w-full h-full object-contain"
        />
      </section>
      <section className="md:ml-[143px] flex flex-col items-center mr-8 bg-white h-[598px] md:mt-[171px] md:mb-[213px]">
        <div className="w-[440px]">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold mb-3">Create an account</h1>
            <p className="text-[16px] text-gray-500">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
          <Formik
            initialValues={{ fullName: "", email: "", password: "", agree: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="text-gray-500 block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter Full Name"
                    className="input input-bordered w-full text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-500 block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="text-gray-500 block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
                <div className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="agree"
                    className="checkbox rounded checkbox-primary w-4 h-4"
                  />
                  <label className="text-xs">
                    I agree to BeamMarkets{" "}
                    <a href="/terms" className="text-blue-500 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-500 underline">
                      Privacy Policy
                    </a>
                  </label>
                  <ErrorMessage name="agree" component="div" className="text-red-500 text-sm" />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary w-full bg-black rounded-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
                <div className="divider uppercase text-sm">or sign in with</div>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="btn btn-outline border border-gray-400  flex items-center px-10 rounded-full "
                  >
                    <img src="google_icon.png" alt="Google" className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline border border-gray-400  flex items-center px-10 rounded-full "
                  >
                    <img src="apple.png" alt="Google" className="w-6 h-6" />
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

export default RegisterPage;
