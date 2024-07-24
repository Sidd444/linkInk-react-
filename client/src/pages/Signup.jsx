import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);

  const onSignup = async () => {
    try {
      setLoading(true);
      await signup(user.fullname, user.email, user.password);
      console.log("Signup success");
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(
      !(user.email.length > 0 && user.password.length > 0 && user.fullname.length > 0)
    );
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          {loading ? "Processing" : "Sign Up"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="fullname" className="sr-only">
                Fullname
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Fullname"
                value={user.fullname}
                onChange={(e) =>
                  setUser({ ...user, fullname: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium text-indigo-400 hover:text-indigo-300">
                Already have an account?{" "}
                <Link to="/login"> Login</Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={onSignup}
              disabled={buttonDisabled}
              className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {buttonDisabled ? "No signup" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
