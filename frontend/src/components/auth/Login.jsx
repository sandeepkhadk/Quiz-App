import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("player"); 
  const [error, setError] = useState(""); // For showing login errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // 1. Send the login request to your Django API
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: email,
        password: password,
        role: role // Sending the selected role to verify
      });

      // 2. Extract user data from the API response
      
      const { name, role: userRole } = response.data;

      // 3. Save name and role to LocalStorage
      
      localStorage.setItem("userName", name);
      localStorage.setItem("userRole", userRole);

      // 4. Redirect based on the role returned by the server
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/quiz");
      }

    } catch (err) {
      // Handle errors (wrong password, user not found, etc.)
      console.error("Login Error:", err);
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100 transition-all">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic tracking-tighter">QUIZ MANIA</h1>
          <p className="text-slate-400 mt-2 uppercase tracking-widest text-xs font-bold">Secure Access</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 animate-shake">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selection UI */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-4">
            <button 
              type="button"
              onClick={() => setRole("player")}
              className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${role === 'player' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}
            >PLAYER</button>
            <button 
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${role === 'admin' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}
            >ADMIN</button>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-600 ml-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all" 
              placeholder="name@email.com" 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-600 ml-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all" 
              placeholder="••••••••" 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 text-lg">
            SIGN IN
          </button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-slate-400 text-sm font-medium">New to Quiz Mania? </span>
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;