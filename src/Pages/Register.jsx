import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebase/Firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Register = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");


  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      let userCredential = await createUserWithEmailAndPassword(auth, email, password);
      let user = userCredential.user;

      // Store user data in localStorage
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred!");
      console.error(error.message);
      setError(error.message);
    }
    

    setError("");
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  let data = {
    username: username,
    email: email,
    phone: phone,
  }
  
 

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
            />
          </div>

          {/* Phone */}
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text" // Using type="text" because "number" type does not handle leading zeros
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              maxLength={10} // Limit to 10 digits
              pattern="\d{10}" // Pattern to ensure exactly 10 digits
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4  text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          If you have an account ? <Link to="/login" className="text-blue-500 hover:underline text-[15px] ">Login</Link>
        </p>
      </div>
    </div>
  );

}

export default Register;
